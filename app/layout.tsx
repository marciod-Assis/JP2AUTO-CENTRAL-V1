import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'JP2auto • Central de atendimento', description: 'Acompanhamento de clientes, ordens de serviço e atendimentos.' };
export default function Layout({children}: {children: React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
