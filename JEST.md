# Configuring jest
> Настройки задаются в файле `jest.config.ts`, который должен находиться в корне проекта

### Options
- `roots` - в какой папке смотреть тесты
- `transform` - пути к трансформерам
- `setupFilesAfterEnv` - выполнить какие-либо действия перед прогоном тестов

### How to add `@testing-library/jest-dom` globally?
- Создать файл jest.setup.ts в корне
```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```
- Добавить в файл `jest.config.ts` поле `setupFilesAfterEnv`
```ts
// jest.config.ts
import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => ({
  ...
  setupFilesAfterEnv: [ '<rootDir>/jest.setup.ts' ],
}
```
