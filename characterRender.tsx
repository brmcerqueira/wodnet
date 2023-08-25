import React, { TsxComplexElement } from "./deps.ts";
import { Character } from "./character.ts";

export const characterRender = (character: Character, campaignId: number, id: string): TsxComplexElement => (
    <html><head>
        <title>Character</title>
        <meta http-equiv="Content-Type" content="application/html; charset=utf-8" />
        <link media="all" rel="stylesheet" href="characterRender.css"></link>
        <script>{`
        setInterval(async () => {
            const response = await fetch("check?campaignId=${campaignId}&id=${id}", {
                method: "GET"
            });
        
            const data = await response.json();
        
            if (data.update) {
                window.location.reload();
            }
        }, 5000);
    `}</script>
    </head>
        <body>
            <table>
                <tbody>
                    <tr><td>Nome:</td><td>{character.name}</td><td>Geração:</td><td>{character.generation}</td><td>Ambição:</td><td>{character.name}</td></tr>
                    <tr><td>Jogador:</td><td>{character.player}</td><td>Predador:</td><td>{character.name}</td><td>Desejo:</td><td>{character.name}</td></tr>
                    <tr><td>Crônica:</td><td>{character.name}</td><td>Clã:</td><td>{character.name}</td><td>Ressonância:</td><td>{character}</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="6">Atributos</th></tr>
                    <tr><th colspan="2">Físicos</th><th colspan="2">Sociais</th><th colspan="2">Mentais</th></tr>
                </thead>
                <tbody>
                    <tr><td>Força</td><td class="td-large">●○○○○</td><td>Carisma</td><td class="td-large">●○○○○</td><td>Inteligência</td><td class="td-large">●○○○○</td></tr>
                    <tr><td>Destreza</td><td class="td-large">●○○○○</td><td>Manipulação</td><td class="td-large">●○○○○</td><td>Raciocínio</td><td class="td-large">●○○○○</td></tr>
                    <tr><td>Vigor</td><td class="td-large">●○○○○</td><td>Autocontrole</td><td class="td-large">●○○○○</td><td>Perseverança</td><td class="td-large">●○○○○</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="6">Habilidades</th></tr>
                    <tr><th colspan="2">Físicos</th><th colspan="2">Sociais</th><th colspan="2">Mentais</th></tr>
                </thead>
                <tbody>
                    <tr><td>Armas Brancas</td><td class="td-large">○○○○○</td><td>Emp. c/Animais</td><td class="td-large">○○○○○</td><td>Acadêmicos</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Armas de Fogo</td><td class="td-large">○○○○○</td><td>Etiqueta</td><td class="td-large">○○○○○</td><td>Ciências</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Briga</td><td class="td-large">○○○○○</td><td>Intimidação</td><td class="td-large">○○○○○</td><td>Finanças</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Condução</td><td class="td-large">○○○○○</td><td>Intuição</td><td class="td-large">○○○○○</td><td>Investigação</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Esportes</td><td class="td-large">○○○○○</td><td>Lábia</td><td class="td-large">○○○○○</td><td>Medicina</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Furtividade</td><td class="td-large">○○○○○</td><td>Liderança</td><td class="td-large">○○○○○</td><td>Ocultismo</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Ofícios</td><td class="td-large">○○○○○</td><td>Manha</td><td class="td-large">○○○○○</td><td>Política</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Roubo</td><td class="td-large">○○○○○</td><td>Performance</td><td class="td-large">○○○○○</td><td>Prontidão</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>Sobrevivência</td><td class="td-large">○○○○○</td><td>Persuasão</td><td class="td-large">○○○○○</td><td>Tecnologia</td><td class="td-large">○○○○○</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="8">Disciplinas</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                    </tr>
                    <tr>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                    </tr>
                    <tr>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                    </tr>
                    <tr>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table class="table-vantagens">
                <thead>
                    <tr><th colspan="2">Vantagens</th></tr>
                </thead>
                <tbody>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                </tbody>
            </table>
            <section class="section-status">
                <section>
                    <h3>Vitalidade</h3>
                    <p>○○○○○ ○○○○○</p>
                    <p>□□□□□ □□□□□</p>
                </section>
                <section>
                    <h3>Força de Vontade</h3>
                    <p>○○○○○ ○○○○○</p>
                    <p>□□□□□ □□□□□</p>
                </section>
                <section>
                    <h3>Potência de Sangue</h3>
                    <p>○○○○○ ○○○○○</p>
                </section>
                <section>
                    <h3>Humanidade</h3>
                    <p>□□□□□ □□□□□</p>
                </section>
                <section>
                    <h3>Fome</h3>
                    <p>□□□□□</p>
                </section>
                <section class="section-experiencia">
                    <h5>Experiência</h5><br /><br /><br />
                </section>
            </section>
            <section class="section-details">
                <table>
                    <thead>
                        <tr><th colspan="2">Especializações</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>______________</td><td>(__________)</td></tr>
                        <tr><td>______________</td><td>(__________)</td></tr>
                        <tr><td>______________</td><td>(__________)</td></tr>
                        <tr><td>______________</td><td>(__________)</td></tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr><th>Alicerces &amp; Convicções</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                    </tbody>
                </table>
            </section>
        </body></html>);