"use client"
import React from 'react';
import sanityClient  from '@sanity/client';
import Image from 'next/image';



const sanity = sanityClient({
    projectId: '2srh4ekv',
    dataset: 'productions',
    token: 'skz6lWFJkAgpfrjXgwK8Tb6UBsTpRcSwzsQawON5Qps118XQdODrtVLdyXySTgJqC7rhPUKAOzb9prGs2aORcV0IICFN6pLKCLW2G0P7u5rExc8E92fzYp0UMuro6VpCzm51svtpWMCniHWaEiZAeJApDrYyIXgO5Uar4GLM2QPxFsswwZnU',
    useCdn: true,
});

interface project {
    _id: string;
    title: string;
    price: number;
    description: string;
    discountPercentage: number;
    imageUrl: string;
    productImage: {
        asset: {
            _ref: string;
        };
    };
    tags: string[];
}

const Asgaardproduct: React.FC = () => {
    const [products, setProducts] = React.useState<project[]>([]);
    const [cart, setCart] = React.useState<project[]>([]);

    const fetchProducts = async () => {
        try {
            const query = `*[_type == "product"] [0...4] {
                _id,
                title,
                price,
                description,
                discountPercentage,
                "imageUrl": productImage.asset->url,
                tags
            }`;

            const data = await sanity.fetch(query);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const addToCart = (product: project) => {
        setCart((prevCart) => [...prevCart, product]);
        alert(`${product.title} has been added to your Cart!`);
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);



   return(
    <div className='p-4'>
        <h2 className='text-center text-slate-800 mt-3 mb-4'></h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols gap-6'>
            {products.map((product)=>(
                <div key={product._id} className='bg-[#F4F5F7] shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300'>
                <Image 
                src= {product.imageUrl}
                alt={product.title}
                width={285}
                height={301}
                className='w-full h-80 object-cover rounded-md'/>

                <div className='mt-4'>
                    <h2 className='text-[24px] font-semibold text-[#3A3A3A] ml-2 mt-4'>{product.title}</h2>
                    <p className='text-sm text-gray-600 line-clamp-1 ml-2'>{product.description}</p>
                    <div>
                        <p className='text-[20px] font-semibold mr-6 ml-2'> $ {product.price}</p>
                        {product.discountPercentage > 0 && (
                            <span className='text-red-500 text-sm'>-{product.discountPercentage}% oFF</span>
                        )}
                    </div>
                </div>     
                </div>
                
            ))}
        </div>
    </div>

   )

}
        
    

export default Asgaardproduct;
