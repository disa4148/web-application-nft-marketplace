import React from 'react'
import css from './manyNft.module.scss'
import { nftNews } from './nftNews'
import NewsNft from '@/shared/ui/newsNft/newsNft'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'


const ManyNft = () => {
    return (
        <div className={css.wrapper}>
        <Carousel className="w-full " orientation='horizontal'>
            <CarouselContent className="-ml-1">
                {nftNews.map((e, index: number) => 
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
                        <div >
                            <NewsNft title={e.title} content={e.content}/>
                        </div>
                    </CarouselItem>
                )}
            </CarouselContent>
        </Carousel>
        </div>
    )
}
export default ManyNft


{/* <div className={css.wrapper}>
           {nftNews.map((e, index: number) => (
            <NewsNft key={index} title={e.title} content={e.content}/>
        ))}
        </div> */}