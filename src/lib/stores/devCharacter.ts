export default {
    name: 'Alû',
    level: 5,
    lineages: 'Leonin',
    classes: 'Rogue 2 / Paladin 3',

    // TODO:
    // Armas simples e marciais.
    // Armadura leve, média e escudos.
    // Linguagem comum, leonina, dialeto militar e dialeto ladino.
    // Veiculos aquáticos.

    // Salto
    // Distância	3.9m
    // Altura	1.2m+0.55m

    // Atletismo
    // Empurrar e puxar	195kg
    // Carga máxima	97.5kg

    attributes: {
        str: 13,
        dex: 16,
        con: 14,
        int: 8,
        wis: 11,
        cha: 14,
    },

    mechanics: {
        hitPoints: {
            total: 45,
            current: 45,
            temporary: 0,
            debuff: 0,
        },
        initiative: 3,
        defense: 16,
        walkSpeed: 30,
        flySpeed: 30,
        swimSpeed: 30,
        darkVision: 60,
        other: [
            { name: 'Resistência', value: 'Veneno' },
            { name: 'Imunidade', value: 'Sono Mágico' },
            { name: 'Vantagem SG', value: 'Doenças' },
            { name: 'Vantagem SG', value: 'Veneno' },
            { name: 'Vantagem SG', value: 'Morte' },
        ],
    },

    skills: [
        { name: 'Salvaguarda', attribute: 'str', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Atletismo', attribute: 'str', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Salvaguarda', attribute: 'dex', proficiency: true, expertise: false, otherBonus: 0 },
        { name: 'Acrobacia', attribute: 'dex', proficiency: true, expertise: false, otherBonus: 0 },
        { name: 'Furtividade', attribute: 'dex', proficiency: true, expertise: true, otherBonus: 0 },
        { name: 'Prestidigitação', attribute: 'dex', proficiency: true, expertise: false, otherBonus: 0 },
        { name: 'Salvaguarda', attribute: 'con', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Salvaguarda', attribute: 'int', proficiency: true, expertise: false, otherBonus: 0 },
        { name: 'Arcanismo', attribute: 'int', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'História', attribute: 'int', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Investigação', attribute: 'int', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Natureza', attribute: 'int', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Religião', attribute: 'int', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Salvaguarda', attribute: 'wis', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Intuição', attribute: 'wis', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Lidar com Animais', attribute: 'wis', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Medicina', attribute: 'wis', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Percepção', attribute: 'wis', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Sobrevivência', attribute: 'wis', proficiency: true, expertise: false, otherBonus: 0 },
        { name: 'Salvaguarda', attribute: 'cha', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Atuação', attribute: 'cha', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Persuasão', attribute: 'cha', proficiency: false, expertise: false, otherBonus: 0 },
        { name: 'Enganação', attribute: 'cha', proficiency: true, expertise: false, otherBonus: 0 },
        { name: 'Intimidação', attribute: 'cha', proficiency: true, expertise: false, otherBonus: 0 },
    ],

    tools: [
        { name: 'Kit Ladinos', expertise: true, otherBonus: 0 },
        { name: 'Kit Venenos', expertise: false, otherBonus: 0 },
    ],

    resources: {
        coins: {
            copper: 10,
            silver: 24,
            gold: 389,
            platinum: 0,
        },

        recoverable: [
            { name: 'd8', current: 1, total: 1, recoveredBy: 'long', notes: '', source: '' },
            { name: 'd10', current: 1, total: 3, recoveredBy: 'long', notes: '', source: '' },
            { name: 'Canalizar Divino', current: 1, total: 1, recoveredBy: 'short', notes: '', source: '' },
            { name: 'Magias 1o círculo', current: 3, total: 3, recoveredBy: 'long', notes: '', source: '' },
            { name: 'Absorver Canalizar Divino', current: 0, total: 1, recoveredBy: 'long', notes: '', source: '' },
            { name: 'Senso Divino', current: 3, total: 3, recoveredBy: 'long', notes: '', source: '' },
            { name: 'Curar pelas Mãos', current: 15, total: 15, recoveredBy: 'long', notes: '', source: '' },
            { name: 'Lágrima da Dríade', current: 1, total: 1, recoveredBy: 'long', notes: '', source: '' },
        ],

        finite: [
            { name: 'Rede', amount: 1, unity: 'u', notes: '', source: 'https://www.dndbeyond.com/equipment/net' },
            { name: 'Veneno Potente', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Adaga com Prata', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Adagas', amount: 5, unity: 'u', notes: '', source: '' },
            { name: 'Cura 1d4+1', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Cura 2d4+2', amount: 1, unity: 'u', notes: '', source: '' },
            {
                name: 'Bomba de Fumaça',
                amount: 2,
                unity: 'u',
                notes: '',
                source: 'https://www.dndbeyond.com/equipment/grenade-smoke',
            },
            { name: 'Seixos', amount: 6, unity: 'u', notes: '', source: '' },
            { name: 'Cadeado de alta qualidade com chave', amount: 1, unity: 'u', notes: '', source: '' },
            {
                name: 'Algemas',
                amount: 2,
                unity: 'u',
                notes: '',
                source: 'https://www.dndbeyond.com/equipment/manacles',
            },
            {
                name: 'Corda de Cânhamo',
                amount: 15,
                unity: 'm',
                notes: '',
                source: 'https://www.dndbeyond.com/equipment/rope-hempen-50-feet',
            },
            { name: 'Corrente', amount: 3, unity: 'm', notes: '', source: '' },
            {
                name: 'Kit Primeiro Socorros',
                amount: 10,
                unity: 'u',
                notes: '',
                source: 'https://www.dndbeyond.com/equipment/healers-kit',
            },
            { name: 'Óleo', amount: 3, unity: 'u', notes: '', source: 'https://www.dndbeyond.com/equipment/oil-flask' },
            { name: 'Vela', amount: 5, unity: 'u', notes: '', source: '' },
            { name: 'Apito', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Linha de Seda', amount: 15, unity: 'm', notes: '', source: '' },
            { name: 'Frascos', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Caixa de Fogo', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Bolsa com Giz', amount: 1, unity: 'u', notes: '', source: '' },
            {
                name: 'Lanterna Coberta',
                amount: 1,
                unity: 'u',
                notes: '',
                source: 'https://www.dndbeyond.com/equipment/lantern-hooded',
            },
            { name: 'Livreto 50p.', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Lápis', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Parafina', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Pedra de Amolar', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Sino', amount: 1, unity: 'u', notes: '', source: '' },
            { name: 'Insígnia Sagrada', amount: 1, unity: 'u', notes: '', source: '' },
        ],
    },

    // equipped_items: [
    //   { name: "Botas Élficas",              notes: "", source: "" },
    //   { name: "Manto Preto Comum",          notes: "", source: "" },
    //   { name: "Armadura de Couro Batido",   notes: "", source: "" },
    //   { name: "Lâmina Escondida com prata", notes: "", source: "" },
    //   { name: "Lâmina Escondida",           notes: "", source: "" },
    //   { name: "Mochila",                    notes: "", source: "" },
    // ],

    attacks: [
        {
            name: 'Lâmina Escondida',
            addProficiency: true,
            attribute: 'dex',
            hitBonus: 0,
            damage: '1d6',
            damageType: 'perf',
            notes: 'acuidade, leve, luva, furtiva',
            source: '',
        },
        {
            name: 'Adaga',
            addProficiency: true,
            attribute: 'dex',
            hitBonus: 0,
            damage: '1d4',
            damageType: 'perf',
            notes: 'acuidade, leve, arremesso, alcance (6m 4q 20f / 18m 12q 60f)',
            source: '',
        },
        {
            name: 'Ataque Furtivo',
            addProficiency: false,
            attribute: 'dex',
            hitBonus: 0,
            damage: '1d6',
            damageType: 'mesmo do armamento',
            notes: '1x turno, dano extra se (1) atacar com vantagem e (2) a arma possuir finesse ou ser de longo alcance. vantagem desnecessária se houver um inimigo não incapacitado adjacente ao alvo e nenhuma desvantagem no ataque.',
            source: '',
        },
        {
            name: 'Golpe divino',
            addProficiency: true,
            attribute: 'dex',
            hitBonus: 0,
            damage: '1d8 (+1d8 ++)',
            damageType: 'radiante',
            notes: 'num acerto com ataque de arma corpo a corpo, dano extra gastando spell slot até um máximo de 5d8. +1d8 se o alvo for um morto-vivo ou um demônio, até +6d8.',
            source: '',
        },
        {
            name: 'Veneno Potente',
            addProficiency: true,
            attribute: 'dex',
            hitBonus: 0,
            damage: '2d8 (SG CON 14) venenoso',
            damageType: 'veneno',
            notes: 'dano extra venenoso, se falhar na SG, fica envenenado até o final do próximo turno.',
            source: '',
        },
    ],

    features: [
        {
            name: 'Natureza M.',
            notes: 'Você não precisa comer, beber ou respirar.\n\nVocê não precisa dormir e a magia não pode fazer você dormir. Você pode terminar um descanso longo em 4 horas se passar essas horas em um estado inativo e imóvel, durante o qual retém a consciência.',
            source: '',
        },
        {
            name: 'Canalizar divino',
            notes: 'Seu juramento permite que você canalize energia divina para alimentar efeitos mágicos. Cada opção de Canalizar Divindade fornecida por seu juramento explica como usá-la. Quando você usa seu Canalizar Divindade, você escolhe qual opção usar. Você deve então terminar um descanso curto ou longo para usar seu Canalizar Divindade novamente. Alguns efeitos de Canalizar Divindade requerem testes de resistência. Quando você usa tal efeito desta classe, a CD é igual a sua CD de resistência de magia de paladino.\n\n- Abjurar Inimigo: como uma ação, você apresenta seu símbolo sagrado e faz uma oração de denúncia, usando seu Canalizar Divindade. Escolha uma criatura a até 18 metros de você que você possa ver. Essa criatura deve fazer um teste de resistência de Sabedoria, a menos que seja imune a ser amedrontado. Demônios e mortos-vivos têm desvantagem neste teste de resistência. Se falhar na resistência, a criatura fica amedrontada por 1 minuto ou até sofrer qualquer dano. Enquanto estiver amedrontada, a velocidade da criatura é 0 e ela não pode se beneficiar de nenhum bônus em sua velocidade. Em um teste de resistência bem-sucedido, a velocidade da criatura é reduzida pela metade por 1 minuto ou até que a criatura sofra algum dano.\n\n- Voto de Inimizade: como uma ação bônus, você pode proferir um voto de inimizade contra uma criatura que você possa ver a até 3 metros de você, usando seu Canalizar Divindade. Você ganha vantagem nas jogadas de ataque contra a criatura por 1 minuto ou até que ela caia para 0 pontos de vida ou fique inconsciente.\n\n- Absorver canalização divina: como uma ação bônus, você toca seu símbolo sagrado, profere uma oração e recupera um espaço de magia gasto, cujo nível não pode ser maior que metade de seu bônus de proficiência (arredondado para cima). O número de vezes que você pode usar esse recurso é baseado no nível que você alcançou nesta classe: 3º nível, uma vez; 7º nível, duas vezes; e 15º nível, três vezes. Você recupera todos os usos gastos quando termina um descanso longo.',
            source: '',
        },
        {
            name: 'Senso Divino',
            notes: 'A presença do mal forte é registrada em seus sentidos como um odor nocivo, e o bem poderoso soa como música celestial em seus ouvidos. Com uma ação, você pode abrir sua consciência para detectar tais forças. **Até o final do seu próximo turno, você sabe a localização de qualquer celestial, demônio ou morto-vivo a até 18 metros de você que não esteja atrás de cobertura total.** Você conhece o tipo (celestial, demoníaco ou morto-vivo) de qualquer ser cuja presença você sente, mas não sua identidade (o vampiro Conde Strahd von Zarovich, por exemplo). Dentro do mesmo raio, você também detecta a presença de qualquer lugar ou objeto que tenha sido consagrado ou profanado, como no feitiço Hallow.\n\nVocê pode usar esta característica um número de vezes igual a 1 + seu modificador de Carisma. Ao terminar um descanso longo, você recupera todos os usos gastos.',
            source: '',
        },
        {
            name: 'Cura pelas Mãos',
            notes: 'Seu toque abençoado pode curar feridas. Você tem uma reserva de poder de cura que é reabastecida quando você faz um descanso longo. Com essa reserva, você pode restaurar um número total de pontos de vida igual ao seu nível de paladino x 5.\n\nComo uma ação, você pode tocar uma criatura e extrair poder da reserva para restaurar um número de pontos de vida daquela criatura, até o máximo restante em sua reserva.\n\nAlternativamente, você pode gastar 5 pontos de vida de sua reserva de cura para curar o alvo de uma doença ou neutralizar um veneno que o esteja afetando. Você pode curar várias doenças e neutralizar vários venenos com um único uso de Imposição de mãos, gastando pontos de vida separadamente para cada um.\n\nEste recurso não tem efeito em mortos-vivos e construtos.',
            source: '',
        },
        {
            name: 'Ataque Furtivo',
            notes: 'Começando no 1º nível, você sabe como atacar sutilmente e explorar a distração de um inimigo. Uma vez por turno, você pode causar 1d6 de dano extra a uma criatura que acertar com um ataque se tiver vantagem na jogada de ataque. O ataque deve usar uma sutileza ou uma arma de longo alcance.\n\nVocê não precisa de vantagem na jogada de ataque se outro inimigo do alvo estiver a até 1,5 metro dele, esse inimigo não estiver incapacitado e você não tiver desvantagem na jogada de ataque.',
            source: '',
        },
        {
            name: 'Resiliente',
            notes: 'Você pode se mover duas vezes o tempo normal (até 16 horas) a cada dia antes de ser sujeito ao efeito de uma marcha forçada. Além disso, você pode encontrar automaticamente uma rota segura para desembarcar um barco em terra, desde que tal rota exista.',
            source: '',
        },
        {
            name: 'Veneno potente e criação',
            notes: 'Ação bônus para aplicar em arma. Se falhar SG CON 14, 2d8 fica envenenado até o final do próximo turno.\n\nGastar 1 hora de trabalho, com kit de veneno disponível, e 50 po em materiais produz uma quantidade de doses de veneno potente igual a sua proficiência. Seus venenos ignoram resistência a venenos dos alvos.',
            source: '',
        },
        {
            name: 'Kit de Veneno',
            notes: 'componentes. frascos de vidro, almofariz/pilão, produtos químicos e vareta de vidro.\nhistória. ajuda a se lembrar de envenenamentos famosos.\ninvestigação e percepção. facilita a inspeção de objetos envenenados ou a tentativa de extrair informações de eventos que envolvam venenos.\nmedicina. ao tratar uma vítima de veneno, você sabe como oferecer o melhor tratamento.\nnatureza e sobrevivência. capacitado a adquirir conhecimento sobre quais plantas e animais são venenos.\nmanusear veneno. manusea e aplica veneno sem risco de se expor aos efeitos adversos.\natividades. detectar objetos envenenados, determinar efeitos de um veneno.',
            source: '',
        },
        {
            name: 'Kit de Ladino',
            notes: 'componentes. pequena lima, conjunto de gazuas, pequeno espelho montado num baco de metal, conjunto de tesouras de lâminas estreita e um par de alicates.\nhistória. concede informação sobre locais famosos por suas armadilhas.\ninvestigação e percepção. facilidade em encontrar armadilhas.\nmontar uma armadilha. assim como você pode armar armadilhas, também pode desarmá-las. como parte de um descanso curto, você pode criar armadilhas usando itens que estiverem à mão. o resultado do seu teste torna-se a CD para a tentativa de outra criatura de descobrir ou desarmar a armadilha. o tipo de dano causado por uma armadilha é aquele adequado aos materiais usados na sua criação (venenoso, para o material venenoso, ou perfurante, para o material lança) ou uma quantidade de dano igual a metade do resultado do seu teste, à escolha do DM.\natividades. arrombar fechadura e desarmar armadilhas.',
            source: '',
        },
        // {
        //     name: 'Marinheiro',
        //     notes: 'Estilo de luta nível 2. Contanto que você não esteja vestindo armadura pesada ou usando um escudo, você tem um deslocamento de natação e um deslocamento de escalada igual ao seu deslocamento normal e ganha um bônus de +1 na classe de armadura.',
        //     source: '',
        // },
        {
            name: 'Ação Astuta',
            notes: 'Seu pensamento rápido e agilidade permitem que você se mova e aja rapidamente. Você pode realizar uma ação bônus em cada um de seus turnos de combate. Esta ação pode ser usada apenas para executar a ação Correr, Desengajar ou Esconder.',
            source: '',
        },
    ],

    spellMechanics: {
        attribute: 'cha',
        hitBonus: 0,
        availablePerDay: 3,
        saveDifficultyBonus: 0,
        slots: [
            {
                circle: 1,
                total: 3,
                current: 3,
            },
            // {
            //     level: 2,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 3,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 4,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 5,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 6,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 7,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 8,
            //     total: 0,
            //     current: 0,
            // },
            // {
            //     level: 9,
            //     total: 0,
            //     current: 0,
            // },
        ]
    },

    spells: [
        {
            name: 'Amaldiçoar',
            circle: 1,
            alwaysAvailable: true,
            available: false,
            school: 'enchantment',
            conjurationTime: 'ação',
            range: '9m6q30f',
            target: 'até 3 crias',
            components: {
                verbal: true,
                somatic: true,
                material: true,
                notes: 'gota de sangue',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: 'SGCHA. ATQ & SG -1d4. +1 alvo ++',
            source: '',
        },

        {
            name: 'Marca do Caçador',
            circle: 1,
            alwaysAvailable: true,
            available: false,
            school: 'divination',
            conjurationTime: 'bônus',
            range: '36m18q90f',
            target: '1 cria ver',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                notes: '',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: '+1d6. VTG percep encontra ou sobrev rastrear. morreu, bônus marca outra cria.',
            source: '',
        },

        {
            name: 'Abençoar',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'enchantment',
            conjurationTime: 'ação',
            range: '9m6q30f',
            target: 'até 3 crias',
            components: {
                verbal: true,
                somatic: true,
                material: true,
                notes: 'água benta',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: 'ATQ & SG +1d4. +1 alvo ++',
            source: '',
        },

        {
            name: 'Cerimônia',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'abjuration',
            conjurationTime: '1 hora',
            range: 'toque',
            target: 'toque',
            components: {
                verbal: true,
                somatic: true,
                material: true,
                notes: '25po em pó de prata',
            },
            duration: 'insta',
            concentration: false,
            ritual: true,
            notes: 'reparação índole. água benta. virando adulto. devoção. funeral. casamento',
            source: '',
        },

        {
            name: 'Ordenar',
            circle: 1,
            alwaysAvailable: false,
            available: true,
            school: 'enchantment',
            conjurationTime: 'ação',
            range: '18m12q60f',
            target: '1 cria ver',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                notes: '',
            },
            duration: '1 rodada',
            concentration: false,
            ritual: false,
            notes: 'SGSAB. ZE und, surdo, ling diff, autoflag. 1 word. + alvo 9m6q30f entre alvos ++',
            source: '',
        },

        {
            name: 'Duelo Compelido',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'enchantment',
            conjurationTime: 'bônus',
            range: '9m6q30f',
            target: '1 cria ver',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                notes: '',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: 'SGSAB ou desv atq senão vc. SG afastar +9m. acaba c interferência ou mod foco',
            source: '',
        },

        {
            name: 'Curar Ferimentos',
            circle: 1,
            alwaysAvailable: false,
            available: true,
            school: 'evocation',
            conjurationTime: 'ação',
            range: 'toque',
            target: '1 cria toque',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: 'insta',
            concentration: false,
            ritual: false,
            notes: '1d8 + mod conj. ZE undead/construc. +1d8 ++',
            source: '',
        },

        {
            name: 'Detectar Bem e Mau',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'divination',
            conjurationTime: 'ação',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: '9m aber, celes, elem, fey, demo, und, consa, profa. pedra, metais, madeir bloqueia',
            source: '',
        },

        {
            name: 'Detectar Magia',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'divination',
            conjurationTime: 'si mesmo',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: '9m auras mágicas e escolas de magia. pedra, metais, madeir bloqueia',
            source: '',
        },

        {
            name: 'Detectar Venenos e Doenças',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'divination',
            conjurationTime: 'si mesmo',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: '9m ven, cria ven, doenças e seus tipos. pedra, metais, madeir bloqueia',
            source: '',
        },

        {
            name: 'Favor Divino',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'evocation',
            conjurationTime: 'bônus',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: '+1d4 dano radiante nos golpes com armas',
            source: '',
        },

        {
            name: 'Heroísmo',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'enchantment',
            conjurationTime: 'ação',
            range: 'toque',
            target: 'cria disposta',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: 'imune medo. init turno hp temp mod conj. hp temp rm no fim. +1 alvo ++',
            source: '',
        },

        {
            name: 'Proteção x Bem e Mau',
            circle: 1,
            alwaysAvailable: false,
            available: true,
            school: 'abjuration',
            conjurationTime: 'ação',
            range: 'toque',
            target: 'cria disposta',
            components: {
                verbal: true,
                somatic: true,
                material: true,
                notes: 'água benta ou pó de prata e ferro, consumidos',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: 'aber, celes, elem, fey, demo, und desv atq. imune ou vant SG medo char posse',
            source: '',
        },

        {
            name: 'Purificar Comes Bebes',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'transmutation',
            conjurationTime: 'ação',
            range: '3m2q10f',
            target: '1q radus sph',
            components: {
                verbal: true,
                somatic: true,
                material: false,
                notes: '',
            },
            duration: 'insta',
            concentration: false,
            ritual: false,
            notes: 'insta	○	○	rm ven doenças comes e bebes não magic',
            source: '',
        },

        {
            name: 'Golpe Abrasador',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'evocation',
            conjurationTime: 'bônus',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                notes: '',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: '1x +1d6 fogo + ignite SGCON init ou 1d6 fogo. sSG ou ação rm ignite. init 1d6 ++',
            source: '',
        },

        {
            name: 'Escudo de Fé',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'abjuration',
            conjurationTime: 'bônus',
            range: '18m12q60f',
            target: '1 cria',
            components: {
                verbal: true,
                somatic: true,
                material: true,
                notes: 'txt sagrado',
            },
            duration: '10 min',
            concentration: true,
            ritual: false,
            notes: '+2 CA',
            source: '',
        },

        {
            name: 'Golpe Estrondoso',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'evocation',
            conjurationTime: 'bônus',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                notes: '',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: '1x +2d6 elec. SGFOR ou emp 3m2q10f e prone. audível 90m27q300f',
            source: '',
        },

        {
            name: 'Golpe Furioso',
            circle: 1,
            alwaysAvailable: false,
            available: false,
            school: 'evocation',
            conjurationTime: 'bônus',
            range: 'si mesmo',
            target: 'si mesmo',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                notes: '',
            },
            duration: '1 min',
            concentration: true,
            ritual: false,
            notes: '1x +1d6 psic. SGSAB ou medo até fim. ação sSGSAB tira medo',
            source: '',
        },
    ],
}
