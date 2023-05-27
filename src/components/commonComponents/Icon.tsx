import { iconsType } from '@/interfaces/icons'
import React, { useCallback } from 'react'
import Image from 'next/image'

type Props = {
    icon: iconsType
}

export default function Icon({ icon }: Props) {

    return (
        <Image
            className='icon'
            src={`/icons/${icon}.png`}
            alt={icon}
            height={288}
            width={288}
            quality={100}
        />
    )
}