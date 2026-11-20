import './globals.css';

export const metadata = {
  title: 'Mateus Galdino | GitHub',
  description: 'Perfil de Mateus Galdino, tecnologias e atividade no GitHub.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
