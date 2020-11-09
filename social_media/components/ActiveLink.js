import { withRouter } from 'next/router'

const ActiveLink = ({ router, href, applyColorChange, children }) => {
	;(function prefetchPages () {
		if (typeof window !== 'undefined') {
			router.prefetch(router.pathname)
		}
	})()

	const handleClick = (event) => {
		event.preventDefault()
		router.push(href)
	}

	// asPath is the string if we use 'as' to rename the path
	const isCurrentPath = router.pathname === href || router.asPath === href

	return (
		<div>
			<a
				href={href}
				onClick={handleClick}
				style={{
					textDecoration : 'none',
					margin         : 0,
					padding        : 0,
					fontWeight     : isCurrentPath ? 'bold' : 'normal',
					color          : isCurrentPath && applyColorChange ? '#FFE082' : '#fff'
				}}>
				{children}
			</a>
		</div>
	)
}

export default withRouter(ActiveLink)
