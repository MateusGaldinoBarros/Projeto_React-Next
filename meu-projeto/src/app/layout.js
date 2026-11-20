import './globals.css';

export const metadata = {
  title: 'Aetheon Labs — Engenharia Criativa & Arquitetura Digital',
  description: 'Portfólio de engenharia criativa, arquitetura digital e experiências espaciais.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
