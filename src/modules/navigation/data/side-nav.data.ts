import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Inicio',
        items: ['dashboard'],
    },
    {
        text: 'Paciente',
        items: ['layouts', 'pages'],
    },
    {
        text: 'Mas cosas!',
        items: ['charts', 'tables'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Bienvenido',
        link: '/dashboard',
    },
    layouts: {
        icon: 'columns',
        text: 'Mis Turnos',
        submenu: [
            {
                text: 'Historial',
                link: '/dashboard/static',
            },
            {
                text: 'Turnos próximos',
                link: '/dashboard/light',
            },
            {
                text: '',
                link: '/dashboard/light',
            },
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Solicitar Turno',
        link: '/dashboard',
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },
};
