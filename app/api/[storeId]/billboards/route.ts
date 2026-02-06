import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {
                status: 401
            })
        }

        const { label, imageUrl } = await req.json()

        if (!label) {
            return new NextResponse("Label is Required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image is Required", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label: label,
                imageUrl: imageUrl,
                storeId
            }
        });

        return NextResponse.json(billboard)
    } catch (e: any) {
        console.log('[BILLBOARDS_POST]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params
        if (!storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId
            }
        });
        return NextResponse.json(billboards)
    } catch (e: any) {
        console.log('[BILLBOARDS_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}