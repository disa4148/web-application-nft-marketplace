import React from 'react'
import css from './newsNft.module.scss'


type Props = {
    title: string,
    content: string,
}

const NewsNft = ({title, content}: Props): JSX.Element => {
    return (
        <div className={css.wrapper}>
            <p>{title}</p>
            <p>{content}</p>
        </div>
    )
}

export default NewsNft
