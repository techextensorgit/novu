## 2.0.4 (2024-12-24)

### 🧱 Updated Dependencies

- Updated @novu/client to 2.0.4
- Updated @novu/shared to 2.1.5

### ❤️ Thank You

- GalTidhar @tatarco
- George Desipris @desiprisg
- George Djabarov @djabarovgeorge
- Pawan Jain


## 2.0.3 (2024-11-26)

### 🚀 Features

- **dashboard:** Codemirror liquid filter support ([#7122](https://github.com/novuhq/novu/pull/7122))
- **root:** add support chat app ID to environment variables in d… ([#7120](https://github.com/novuhq/novu/pull/7120))
- **root:** Add base Dockerfile for GHCR with Node.js and dependencies ([#7100](https://github.com/novuhq/novu/pull/7100))

### 🩹 Fixes

- **api:** Migrate subscriber global preferences before workflow preferences ([#7118](https://github.com/novuhq/novu/pull/7118))
- **api, dal, framework:** fix the uneven and unused dependencies ([#7103](https://github.com/novuhq/novu/pull/7103))

### 🧱 Updated Dependencies

- Updated @novu/client to 2.0.3
- Updated @novu/shared to 2.1.4

### ❤️  Thank You

- George Desipris @desiprisg
- Himanshu Garg @merrcury
- Richard Fontein @rifont

## 2.0.2 (2024-11-19)

### 🚀 Features

- **root:** release 2.0.1 for all major packages ([#6925](https://github.com/novuhq/novu/pull/6925))
- **headless:** update after pr comment ([79cf7e920](https://github.com/novuhq/novu/commit/79cf7e920))
- **headless:** add remove notifications method ([aa9f323ea](https://github.com/novuhq/novu/commit/aa9f323ea))
- remove submodule from monorepo pnpm workspace ([b4932fa6a](https://github.com/novuhq/novu/commit/b4932fa6a))
- export types/interfaces from headless servive ([081faadf1](https://github.com/novuhq/novu/commit/081faadf1))
- prefernce methods in node sdk and headless ([f4117347d](https://github.com/novuhq/novu/commit/f4117347d))
- get global preferences ([e3c002a3e](https://github.com/novuhq/novu/commit/e3c002a3e))
- add global preference method to node sdk ([45fa09729](https://github.com/novuhq/novu/commit/45fa09729))
- tests ([6889a86ce](https://github.com/novuhq/novu/commit/6889a86ce))
- implemented it on sdks and headless ([2002b3f79](https://github.com/novuhq/novu/commit/2002b3f79))
- **types:** create enum for the web socket events ([527b44e56](https://github.com/novuhq/novu/commit/527b44e56))
- **headless:** add listen to notification_received in headless service ([adc15e811](https://github.com/novuhq/novu/commit/adc15e811))
- exported types from the headless package, and updated the docs ([c945d3253](https://github.com/novuhq/novu/commit/c945d3253))
- Added new method for removeAllNotifications ([8b6e148c9](https://github.com/novuhq/novu/commit/8b6e148c9))
- Add markNotificationsAsSeen ([95fc7487f](https://github.com/novuhq/novu/commit/95fc7487f))
- add pagination support with limit ([a0dbc5251](https://github.com/novuhq/novu/commit/a0dbc5251))
- speed up eslint parser timing ([#3250](https://github.com/novuhq/novu/pull/3250))
- add unread count change listener ([0fa7654de](https://github.com/novuhq/novu/commit/0fa7654de))
- added tests ([3dbb7063f](https://github.com/novuhq/novu/commit/3dbb7063f))
- added few more methods and refactor types ([f9b29af40](https://github.com/novuhq/novu/commit/f9b29af40))
- remove un need org id on initialize session ([8efcceacd](https://github.com/novuhq/novu/commit/8efcceacd))
- remove un need org id on initialize session ([1fd916f5b](https://github.com/novuhq/novu/commit/1fd916f5b))
- add remove notification to headless lib ([3b3b46a08](https://github.com/novuhq/novu/commit/3b3b46a08))
- **headless:** headless package with a notification center business logic and socket management ([27c1bf886](https://github.com/novuhq/novu/commit/27c1bf886))

### 🩹 Fixes

- **root:** Build only public packages during preview deployments ([#6590](https://github.com/novuhq/novu/pull/6590))
- **headless:** dont refetch notifications ([#6290](https://github.com/novuhq/novu/pull/6290))
- **echo:** Use dist for Echo artifacts ([#5590](https://github.com/novuhq/novu/pull/5590))
- updated test cases for headless service ([9edc7496f](https://github.com/novuhq/novu/commit/9edc7496f))
- headless api client remove/refetch query scenarios ([e668827a0](https://github.com/novuhq/novu/commit/e668827a0))
- merge conflicts ([ea2a0f471](https://github.com/novuhq/novu/commit/ea2a0f471))
- package vulnerabilities ([0e496d6d2](https://github.com/novuhq/novu/commit/0e496d6d2))
- 37.60.242.154 binding ([5a261f847](https://github.com/novuhq/novu/commit/5a261f847))
- run prettier for heeadless.service ([577338d93](https://github.com/novuhq/novu/commit/577338d93))
- tests ([8f6601a55](https://github.com/novuhq/novu/commit/8f6601a55))
- tests ([f400cb425](https://github.com/novuhq/novu/commit/f400cb425))
- updated the types and onsuccess method ([11ac4c4ab](https://github.com/novuhq/novu/commit/11ac4c4ab))
- **deps:** update dependency socket.io-client to v4.6.1 ([117756264](https://github.com/novuhq/novu/commit/117756264))
- **ws|webhook:** socket versions match ([1c72a8a35](https://github.com/novuhq/novu/commit/1c72a8a35))
- **infra:** resolve some deepsource javascript issues ([368733676](https://github.com/novuhq/novu/commit/368733676))

### ❤️  Thank You

- ainouzgali
- Biswajeet Das @BiswaViraj
- David Söderberg
- Dima Afanasiev
- Dima Grossman @scopsy
- Gosha
- Himanshu Garg @merrcury
- Ivan STEPANIAN @iv-stpn
- p-fernandez
- Paweł
- praxter11
- Richard Fontein @rifont
- Sokratis Vidros @SokratisVidros
- Vishnu Kumar V @vichustephen
