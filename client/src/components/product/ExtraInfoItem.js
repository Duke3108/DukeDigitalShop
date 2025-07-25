import React, { memo } from 'react'

const ExtraInfoItem = ({ icon, title, sub }) => {
    return (
        <div className='flex items-center p-3 gap-4 mb-[10px] border'>
            <span className='flex items-center justify-center p-2 text-white bg-gray-700 rounded-full'>{icon}</span>
            <div className='flex flex-col text-sm text-gray-500'>
                <span className='font-medium'>{title}</span>
                <span className='text-xs'>{sub}</span>
            </div>
        </div>
    )
}

export default memo(ExtraInfoItem)
