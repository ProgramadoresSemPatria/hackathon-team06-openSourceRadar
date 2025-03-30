import { PageLayout } from "@/components/PageLayout";

export default function Privacy() {
  return (
    <PageLayout>
      <div className="py-6 space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">Política de Privacidade</h1>

        <p className="text-muted-foreground">Última atualização: 29 de Março, 2025</p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Introdução</h2>
          <p>
            Open Source Radar ("nós", "nosso", ou "plataforma") está comprometido em proteger sua privacidade. Esta
            Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você utiliza
            nosso serviço.
          </p>

          <h2 className="text-xl font-semibold">2. Informações que Coletamos</h2>
          <p>Para fornecer nossos serviços, coletamos as seguintes informações:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Informações da conta GitHub que você compartilha ao fazer login (nome, email, nome de usuário, foto)
            </li>
            <li>Preferências de linguagem de programação e nível de experiência</li>
            <li>Projetos favoritados e interações com a plataforma</li>
          </ul>

          <h2 className="text-xl font-semibold">3. Como Usamos suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Personalizar recomendações de projetos open source</li>
            <li>Melhorar nossos serviços e experiência do usuário</li>
            <li>Comunicar atualizações e informações relevantes</li>
          </ul>

          <h2 className="text-xl font-semibold">4. Compartilhamento de Dados</h2>
          <p>Não vendemos suas informações a terceiros. Compartilhamos dados apenas:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Com a API do GitHub para acessar repositórios e dados públicos</li>
            <li>Com fornecedores de serviços que nos ajudam a operar a plataforma (como Firebase)</li>
          </ul>

          <h2 className="text-xl font-semibold">5. Segurança</h2>
          <p>
            Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado
            ou alteração.
          </p>

          <h2 className="text-xl font-semibold">6. Seus Direitos</h2>
          <p>
            Você tem o direito de acessar, corrigir ou solicitar a exclusão de suas informações. Para exercer esses
            direitos, entre em contato conosco.
          </p>

          <h2 className="text-xl font-semibold">7. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política ocasionalmente. Recomendamos revisar periodicamente para estar ciente das
            alterações.
          </p>

          <h2 className="text-xl font-semibold">8. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através de nosso GitHub.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
