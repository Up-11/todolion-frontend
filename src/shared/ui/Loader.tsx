import { Loader2 } from 'lucide-react'

import { PropsWithClassName } from '../../types/common'
import { cn } from '../lib/css'

export const Loader = <T extends PropsWithClassName & { size?: number }>({
	className,
	size
}: T) => {
	return (
		<div>
			<Loader2 size={size} className={cn(className, 'animate-spin')} />
		</div>
	)
}
