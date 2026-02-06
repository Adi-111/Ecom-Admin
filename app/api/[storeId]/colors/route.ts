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

        const { name, value } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Value is Required", { status: 400 })
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

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: storeId
            }
        });

        return NextResponse.json(color)
    } catch (e: any) {
        console.log('[COLORS_POST]', e)
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

        const colors = await prismadb.color.findMany({
            where: {
                storeId: storeId
            }
        });
        return NextResponse.json(colors)
    } catch (e: any) {
        console.log('[COLORS_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}