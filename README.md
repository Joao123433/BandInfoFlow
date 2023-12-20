# Aplicativo de Informações sobre Bandas de Música
- Este repositório contém uma aplicação web simples que permite aos usuários buscar informações sobre bandas de música ou artistas usando a API MusicBrainz. A aplicação fornece detalhes sobre a banda, incluindo seu nome, origem e status ativo. Além disso, ela busca informações sobre os álbuns lançados pela banda.

## Funcionalidades
- `Buscar Bandas/Artistas:` Os usuários podem inserir o nome de uma banda ou artista no campo de entrada para obter informações.
- `Exibir Informações da Banda:` A aplicação exibe informações básicas sobre a banda, como nome, origem e status ativo.
- `Listar Álbuns Lançados:` Ao pesquisar por uma banda, a aplicação lista até três de seus álbuns lançados, incluindo o nome do álbum e a data de lançamento.

## Dependências
- A aplicação utiliza a [API MusicBrainz](https://musicbrainz.org/doc/MusicBrainz_API) para obter informações sobre bandas e seus álbuns lançado

## Estrutura
- `fetchBands(valueUser):` Obtém informações sobre a banda/artista na API MusicBrainz.
- `fetchJobs(idBand):` Obtém informações sobre os álbuns lançados de uma banda usando a API MusicBrainz.
- `getData():` Recupera a entrada do usuário e trata a validação da entrada.
- `clearInformation():` Limpa as informações exibidas na página da web.
- `tratamentErrorSpan():` Lida e exibe erros de validação da entrada.
- `submitValue(ev):` Lida com o envio do formulário, obtém informações da banda/artista e as exibe.
- `settinValuesBand(bandData):`  Exibe informações básicas sobre a banda/artista
- `seachJobs(idUser):` Obtém as informações sobre os álbuns lançados pela banda/artista.
- `setttingValuesAlbuns(albumData): ` Exibe informações básicas sobre 3 albuns da banda/artista
- Várias funções auxiliares para criar elementos HTML (`createh1Error`, `createParagraphTitle`, `createParagraphData`, `createHr`).

## Link pro projeto
- https://joao123433.github.io/BandInfoFlow/