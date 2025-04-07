export const mutateFromContentToList = (content: string) => {
	return content.split('\n').map(item => {
		return { title: item, isDone: false }
	})
}
export const mutateFromListToContent = (
	contentList: { title: string; isDone: boolean }[]
) => {
	return contentList.map(item => item.title).join('\n')
}
