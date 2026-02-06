import prismadb from '@/lib/prismadb'
import { ProductForm } from './_components/product-form'

export default async function ProductPage({ params }: {
  params: Promise<{ productId: string; storeId: string }>
}) {
  const { productId, storeId } = await params
  const product = await prismadb.product.findUnique({
    where: {
      id: productId
    },
    include: {
      images: true
    }
  })

  const categories = await prismadb.category.findMany({
    where: {
      storeId
    }
  })

  const sizes = await prismadb.size.findMany({
    where: {
      storeId
    }
  })

  const colors = await prismadb.color.findMany({
    where: {
      storeId
    }
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  )
}
