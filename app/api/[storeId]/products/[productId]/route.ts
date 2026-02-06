import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string; productId: string }> }
) {
    try {
        const { productId } = await params
        if (!productId) {
            return new NextResponse("Product ID is Required", { status: 400 })
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: productId
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            }
        });

        return NextResponse.json(product)
    } catch (e: any) {
        console.log('[PRODUCT_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ storeId: string; productId: string }> }
) {
    try {
        const { storeId, productId } = await params
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {
                status: 401
            })
        }

        const {
            name,
            price,
            colorId,
            sizeId,
            categoryId,
            images,
            isArchived,
            isFeatured
        } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }
        if (!price) {
            return new NextResponse("price is Required", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("sizeId is Required", { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse("Image are Required", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("colorId is Required", { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse("categoryId is Required", { status: 400 })
        }

        if (!productId) {
            return new NextResponse("Product ID is Required", { status: 400 })
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

        await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                colorId,
                sizeId,
                categoryId,
                images: {
                    deleteMany: {}
                }
            }
        });

        const product = prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image.url)]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (e: any) {
        console.log('[PRODUCT_PATCH]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ storeId: string; productId: string }> }
) {
    try {
        const { storeId, productId } = await params
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {
                status: 401
            })
        }

        if (!productId) {
            return new NextResponse("Product ID is Required", { status: 400 })
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: productId
            }
        });

        return NextResponse.json(product)
    } catch (e: any) {
        console.log('[PRODUCT_DELETE]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
