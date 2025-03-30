import { PageLayout } from "@/components/PageLayout";

export default function Terms() {
  return (
    <PageLayout>
      <div className="py-6 space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">Termos de Serviço</h1>

        <p className="text-muted-foreground">Última atualização: 29 de Março, 2025</p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou usar o Open Source Radar ("plataforma"), você concorda com estes Termos de Serviço. Se você
            não concordar com algum aspecto destes termos, não utilize nossos serviços.
          </p>

          <h2 className="text-xl font-semibold">2. Descrição do Serviço</h2>
          <p>
            O Open Source Radar é uma plataforma que ajuda desenvolvedores a encontrar projetos open source relevantes
            para contribuir, com base em suas habilidades e interesses.
          </p>

          <h2 className="text-xl font-semibold">3. Conta do Usuário</h2>
          <p>
            Para utilizar nossos serviços, você precisa fazer login com sua conta do GitHub. Você é responsável por
            manter a confidencialidade de sua conta e por todas as atividades que ocorrem nela.
          </p>

          <h2 className="text-xl font-semibold">4. Uso Aceitável</h2>
          <p>
            Você concorda em usar nossa plataforma apenas para fins legais e de acordo com estes Termos. Você não deve:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Violar leis ou regulamentos aplicáveis</li>
            <li>Interferir no funcionamento da plataforma</li>
            <li>Tentar acessar áreas restritas sem autorização</li>
            <li>Utilizar a plataforma para distribuir conteúdo malicioso</li>
          </ul>

          <h2 className="text-xl font-semibold">5. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo e funcionalidades disponíveis na plataforma são propriedade do Open Source Radar ou de seus
            licenciadores e são protegidos por leis de propriedade intelectual.
          </p>

          <h2 className="text-xl font-semibold">6. Isenção de Garantias</h2>
          <p>
            A plataforma é fornecida "como está", sem garantias de qualquer tipo, expressas ou implícitas. Não
            garantimos que a plataforma será ininterrupta, segura ou livre de erros.
          </p>

          <h2 className="text-xl font-semibold">7. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, incidentais, especiais ou
            consequentes resultantes do uso ou da incapacidade de usar nossa plataforma.
          </p>

          <h2 className="text-xl font-semibold">8. Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor
            imediatamente após sua publicação. O uso contínuo da plataforma constitui aceitação dos novos Termos.
          </p>

          <h2 className="text-xl font-semibold">9. Lei Aplicável</h2>
          <p>
            Estes Termos são regidos e interpretados de acordo com as leis do Brasil, independentemente de seus
            princípios de conflito de leis.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
