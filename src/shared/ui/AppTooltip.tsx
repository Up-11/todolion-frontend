import React, { PropsWithChildren } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '../components/tooltip'

export const AppTooltip: React.FC<PropsWithChildren & { text: string }> = ({
	children,
	text
}) => {
	return (
		<Tooltip delayDuration={100}>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent>{text}</TooltipContent>
		</Tooltip>
	)
}
