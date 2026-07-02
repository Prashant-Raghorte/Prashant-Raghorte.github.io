const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const SKILL_ICON_MAP: Record<string, string> = {
  React: `${DEVICON}/react/react-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  JavaScript: `${DEVICON}/javascript/javascript-original.svg`,
  HTML: `${DEVICON}/html5/html5-original.svg`,
  CSS: `${DEVICON}/css3/css3-original.svg`,
  Vite: `${DEVICON}/vitejs/vitejs-original.svg`,
  'Node.js': `${DEVICON}/nodejs/nodejs-original.svg`,
  Express: `${DEVICON}/express/express-original.svg`,
  Java: `${DEVICON}/java/java-original.svg`,
  'Spring Boot': `${DEVICON}/spring/spring-original.svg`,
  'REST APIs': `${DEVICON}/fastapi/fastapi-original.svg`,
  MySQL: `${DEVICON}/mysql/mysql-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  MongoDB: `${DEVICON}/mongodb/mongodb-original.svg`,
  SQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  Docker: `${DEVICON}/docker/docker-original.svg`,
  'GitHub Actions': `${DEVICON}/githubactions/githubactions-original.svg`,
  Linux: `${DEVICON}/linux/linux-original.svg`,
  AWS: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  Git: `${DEVICON}/git/git-original.svg`,
  GitHub: `${DEVICON}/github/github-original.svg`,
  'VS Code': `${DEVICON}/vscode/vscode-original.svg`,
  Figma: `${DEVICON}/figma/figma-original.svg`,
  Postman: `${DEVICON}/postman/postman-original.svg`,
}

export function getSkillIcon(name: string): string | undefined {
  return SKILL_ICON_MAP[name]
}
