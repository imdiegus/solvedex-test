import { iconsType } from '@/interfaces/icons'
import React, { useCallback } from 'react'
import Image from 'next/image'

type Props = {
    icon: iconsType
}

export default function Icon({ icon }: Props) {

    return (
        <img
            className='icon'
            src={`/icons/${icon}.png`}
            alt={icon}
        />
    )
}