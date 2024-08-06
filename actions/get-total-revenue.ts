import prismadb from '@/lib/prismadb'

export async function getTotalRevenue(storeId: string) {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const totalRevenue = paidOrders.reduce((total: any, order: { orderItems: any[]; }) => {
        const ordertotal = order.orderItems.reduce((ordersum: any, item: { product: { price: { toNumber: () => any; }; }; }) => {
            return ordersum + item.product.price.toNumber()

        }, 0);
        return total + ordertotal;
    }, 0)

    return totalRevenue
}