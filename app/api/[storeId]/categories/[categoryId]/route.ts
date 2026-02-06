import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ storeId: string; categoryId: string }> }
) {
    try {
        const { storeId, categoryId } = await params
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {
                status: 401
            })
        }

        const { name, billboardId } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("Billboard is Required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("Category ID is Required", { status: 400 })
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

        const category = await prismadb.category.updateMany({
            where: {
                id: categoryId
            },
            data: {
                name,
                billboardId
            }
        });

        return NextResponse.json(category)
    } catch (e: any) {
        console.log('[CATEGORY_PATCH]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ storeId: string; categoryId: string }> }
) {
    try {
        const { storeId, categoryId } = await params
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {
                status: 401
            })
        }

        if (!categoryId) {
            return new NextResponse("Category ID is Required", { status: 400 })
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: categoryId
            }
        });

        return NextResponse.json(category)
    } catch (e: any) {
        console.log('[CATEGORY_DELETE]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string; categoryId: string }> }
) {
    try {
        const { categoryId } = await params
        if (!categoryId) {
            return new NextResponse("Billboard ID is Required", { status: 400 })
        }


        const category = await prismadb.category.findUnique({
            where: {
                id: categoryId
            },
            include: {
                billboard: true
            }
        });

        return NextResponse.json(category)
    } catch (e: any) {
        console.log('[CATEGORY_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}