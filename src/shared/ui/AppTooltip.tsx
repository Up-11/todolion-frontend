import React, { PropsWithChildren } from 'react'

import { PropsWithClassName } from '../../types/common'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/tooltip'

export const AppTooltip: React.FC<
	PropsWithChildren & PropsWithClassName & { text: string }
> = ({ children, text, className }) => {
	return (
		<Tooltip delayDuration={100}>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent className={className}>{text}</TooltipContent>
		</Tooltip>
	)
}
