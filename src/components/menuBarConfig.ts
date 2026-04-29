import type { AppId } from '../App'

export type MenuItemDef =
	| {
			kind: 'item'
			label: string
			shortcut?: string
			disabled?: boolean
			danger?: boolean
			action?: () => void
	  }
	| { kind: 'sep' }

export interface MenuBarConfigParams {
	activeAppTitle: string
	activeAppId?: AppId
	openApps: { id: AppId; title: string }[]
	onOpenApp?: (id: AppId) => void
	onMinimizeActive?: () => void
	onCloseActive?: () => void
}

export const APP_EMOJIS: Record<AppId, string> = {
	about: '🧑‍💻',
	skills: '⌨️',
	experience: '💼',
	education: '🎓',
	contact: '✉️',
}

export const ALL_APPS: { id: AppId; label: string }[] = [
	{ id: 'about', label: 'About Me' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'education', label: 'Education' },
	{ id: 'contact', label: 'Contact' },
]

export function createMenuBarMenus({
	activeAppTitle,
	activeAppId,
	openApps,
	onOpenApp,
	onMinimizeActive,
	onCloseActive,
}: MenuBarConfigParams) {
	const appleItems: MenuItemDef[] = [
		{ kind: 'item', label: 'About This Mac', action: () => onOpenApp?.('about') },
		{ kind: 'sep' },
		{ kind: 'item', label: 'System Settings…', disabled: true },
		{ kind: 'item', label: 'App Store…', disabled: true },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Recent Items', disabled: true },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Force Quit…', disabled: true, shortcut: '⌥⌘⎋' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Sleep', disabled: true },
		{ kind: 'item', label: 'Restart…', disabled: true },
		{ kind: 'item', label: 'Shut Down…', disabled: true },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Lock Screen', disabled: true, shortcut: '⌃⌘Q' },
		{ kind: 'item', label: 'Log Out…', disabled: true, shortcut: '⇧⌘Q' },
	]

	const appItems: MenuItemDef[] = [
		{
			kind: 'item',
			label: `About ${activeAppTitle}`,
			action: () => activeAppId && onOpenApp?.(activeAppId),
		},
		{ kind: 'sep' },
		{ kind: 'item', label: 'Services', disabled: true },
		{ kind: 'sep' },
		{ kind: 'item', label: `Hide ${activeAppTitle}`, shortcut: '⌘H', action: onMinimizeActive },
		{ kind: 'item', label: 'Hide Others', shortcut: '⌥⌘H', disabled: true },
		{ kind: 'item', label: 'Show All', disabled: true },
		{ kind: 'sep' },
		{
			kind: 'item',
			label: `Quit ${activeAppTitle}`,
			shortcut: '⌘Q',
			action: onCloseActive,
			danger: true,
		},
	]

	const fileItems: MenuItemDef[] = [
		{ kind: 'item', label: 'New Window', disabled: true, shortcut: '⌘N' },
		{ kind: 'item', label: 'New Tab', disabled: true, shortcut: '⌘T' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Close Window', shortcut: '⌘W', action: onCloseActive },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Get Info', disabled: true, shortcut: '⌘I' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Print…', disabled: true, shortcut: '⌘P' },
	]

	const editItems: MenuItemDef[] = [
		{ kind: 'item', label: 'Undo', disabled: true, shortcut: '⌘Z' },
		{ kind: 'item', label: 'Redo', disabled: true, shortcut: '⇧⌘Z' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Cut', disabled: true, shortcut: '⌘X' },
		{ kind: 'item', label: 'Copy', disabled: true, shortcut: '⌘C' },
		{ kind: 'item', label: 'Paste', disabled: true, shortcut: '⌘V' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Select All', disabled: true, shortcut: '⌘A' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Find…', disabled: true, shortcut: '⌘F' },
	]

	const viewItems: MenuItemDef[] = [
		{ kind: 'item', label: 'Show Toolbar', disabled: true },
		{ kind: 'item', label: 'Customize Toolbar…', disabled: true },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Show Sidebar', disabled: true, shortcut: '⌃⌘S' },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Enter Full Screen', disabled: true, shortcut: '⌃⌘F' },
	]

	const goItems: MenuItemDef[] = [
		{ kind: 'item', label: 'About Me', shortcut: '⌘1', action: () => onOpenApp?.('about') },
		{ kind: 'item', label: 'Skills', shortcut: '⌘2', action: () => onOpenApp?.('skills') },
		{
			kind: 'item',
			label: 'Experience',
			shortcut: '⌘3',
			action: () => onOpenApp?.('experience'),
		},
		{
			kind: 'item',
			label: 'Education',
			shortcut: '⌘4',
			action: () => onOpenApp?.('education'),
		},
		{ kind: 'item', label: 'Contact', shortcut: '⌘5', action: () => onOpenApp?.('contact') },
		{ kind: 'sep' },
		{
			kind: 'item',
			label: 'GitHub ↗',
			action: () => window.open('https://github.com/ttang1024', '_blank'),
		},
		{
			kind: 'item',
			label: 'LinkedIn ↗',
			action: () => window.open('https://www.linkedin.com/in/tingtang12/', '_blank'),
		},
	]

	const windowItems: MenuItemDef[] = [
		{ kind: 'item', label: 'Minimize', shortcut: '⌘M', action: onMinimizeActive },
		{ kind: 'item', label: 'Zoom', disabled: true },
		{ kind: 'sep' },
		{ kind: 'item', label: 'Bring All to Front', disabled: true },
		...(openApps.length > 0
			? [
					{ kind: 'sep' as const },
					...openApps.map(a => ({
						kind: 'item' as const,
						label: a.title,
						action: () => onOpenApp?.(a.id),
					})),
				]
			: []),
	]

	const helpItems: MenuItemDef[] = [
		{ kind: 'item', label: `${activeAppTitle} Help`, disabled: true, shortcut: '⌘?' },
		{ kind: 'sep' },
		{
			kind: 'item',
			label: 'View Source Code ↗',
			action: () => window.open('https://github.com/ttang1024', '_blank'),
		},
	]

	return {
		appleItems,
		appItems,
		leftMenus: [
			{ id: 'file', label: 'File', items: fileItems },
			{ id: 'edit', label: 'Edit', items: editItems },
			{ id: 'view', label: 'View', items: viewItems },
			{ id: 'go', label: 'Go', items: goItems },
			{ id: 'window', label: 'Window', items: windowItems },
			{ id: 'help', label: 'Help', items: helpItems },
		],
	}
}
