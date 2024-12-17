# Login Page!!

    * prisma 관련 명령어
    npx prisma migrate dev
    npx prisma studio

    * 사용시 문제될수있는것들
    zod schema는 따로 ts를 만들어서 사용하는것이 좋다
    ㄴ> use client에선 상관없지만
    1.	use server 에서 사용할 경우 에러가 뜸
    2.	use client 파일에서 import해와도 에러가 뜬다

    * 많이 햇갈린 부분
    <Form action={action} /> form 을 제출할떈 useActionState를 써야했는데 update폼떄는 db에서 값을 가져오기떄문에
    use client를 사용하지못해 useActionState를 쓰지못해서 막막했다.
    해결법 : form 부분을 컴포넌트로 따로 나누어서 사용해야했다

    * My Extentions
    vscode-styled-components
    Tailwind CSS intelliSense
    SQLite Viewer
    Prisma
    Pretter - code formatter
    Material
    Korean Language Pack for Visual Studio Code
    GitHub Codespaces
    Dracula Theme Official
