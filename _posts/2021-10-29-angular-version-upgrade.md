---
layout:  post
title: angular version upgrade
tags:
- angular
---


### 메이저 버전 간 마이그레이션은 지원하지 않기 때문에 메이저 버전 하나씩 올려야함.
---
> https://update.angular.io/?l=3&v=5.2-13.0




# 5.2 -> 6.0
> node version: 8 이상

### cli가 없으므로 `npm i @angular/cli@6`  
### angular-cli.json -> angular.json으로 변경을 위해
`ng update @angular/cli`

-> 6버전이 아니라 latest로 받아오면 angular.json으로 변경된 거 확인 후 다시 @6로 변경 필요함.  


## 명령 실행
```
npx @angular/cli@6 update @angular/cli@6
npx @angular/cli@6 update @angular/core@6  
npx @angular/cli@6 update @angular/material@6

Windows의 경우 아래
cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/cli@6 @angular/core@6"
cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@6 update @angular/material@6"
```

### 만약 @버전으로 명시했어도 최신버전(latest)으로 업데이트 되면 아래 작업 수행
1. 최신버전으로 바뀐 모듈 이전버전으로 바꾸고 아래 명령어 실행  
`npx @angular/cli@6 update @angular/core@6 @angular/material@6` 합쳐서 명령 날리기
2. 그래도 안되면 캐시 지우는 방법  
`C:\Users\%USERNAME%\AppData\Roaming` > `npm-cache` 폴더 삭제

### 그 외 캐시 지우는 방법
- `npm cache clean --force`
- `node_modules` 폴더 삭제
- `package-lock.json` 삭제

## deprecated 수정

### @angular/http
```shell
@angular/http -> @angular/common/http
HttpModule -> HttpClientModule  
Http -> HttpClient  
```
### ng2-translate
```shell
ng2-translate -> @ngx-translate/core
import {TranslateModule, TranslateLoader} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
TranslateStaticLoader -> TranslateHttpLoader
```

### TranslateModule
```javascript
TranslateModule.forRoot({
  provide: TranslateLoader,
  useFactory: (createTranslateLoader),
  deps: [Http]
 })
```
### --> 변경
```javascript
TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }
})
```

## 패키지 및 모듈 변경
`@angular/platform-browser`에서 `DOCUMENT`를 사용하는 경우  
-> `@angular/common`에서 가져오도록 수정

## rxjs 관련 마이그레이션은 자동으로 하는 툴 실행
`npm i -g rxjs-tslint`  
`rxjs-5-to-6-migrate -p src/tsconfig.app.json`  -> tsconfig.app.json 위치를 설정하면 된다.

### `rxjs-compat` 삭제
> 참고) https://github.com/ReactiveX/rxjs-tslint


## 오류) 의존성 버전 변경
`Package "angular2-jwt" has an incompatible peer dependency to "rxjs" (requires "^5.0.0", would install "6.6.7").`  
-> 이 경우는 angular2-jwt에서 사용하는 rxjs 버전이 낮은데
현재 프로젝트에서 사용하는 rxjs는 6.x라 angular2-jwt를 업그레이드 시켜준다.  
어떤 의존성을 사용하는지 확인하려면 해당 패키지 안에 `package.json > peerDependencies`를 확인해보면 된다.
```
  "peerDependencies": {
    "@angular/core": "8.2.14",
    "@angular/common": "8.2.14",
    "@angular/platform-browser": "8.2.14",
    "rxjs": "^6.4.0"
  },
```


참고로 ^버전 - 캐럿을 사용해 버전명을 사용할 경우 실제 다운받는 버전은 상위의 마이너 버전일 수 있으니  
프로젝트의 package.json에서 해당 패키지 버전을 링크해서 들어가면 설치된 정확한 버전을 확인 할 수 있다.
```
"version": "0.19.43"
```

만약 해당 패키지의 업데이트가 필요한데 더 상위의 메이저 버전이 없을 경우 패키지가 다른 것으로 바뀐 것일 수 있으니  
똑같이 링크해서 들어가서 `repository > url` 에 git 페이지를 들어가서 확인해본다  
```
  "repository": {
    "type": "git",
    "url": "git+https://github.com/moment/moment-timezone.git"
  },
```

---
## ng 관련 실행 오류
> ng : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Users\...\node_modules\.bin\ng.ps1 파일을 로드할 수 없습니다.

-> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` 실행

## npm 관련 명령어 실행시 permission 오류
> 관리자 권한으로 터미널 실행(나는 인텔리제이 관리자권한)



---
# 6.0 -> 7.0
```
npx @angular/cli@7 update @angular/cli@7 @angular/core@7
npx @angular/cli@7 update @angular/material@7
```

### @7로 업데이트하면 `7.2.16`으로 업데이트된다. 이후 material@7 업데이트시 최신 LTS인 13으로 업데이트 되는 문제가 있다.
아래 순서대로 진행해보기
1. `npx @angular/cli@7 update @angular/cli@7 @angular/core@7` core 7 업데이트 후
2. 7로 업데잍트된 패키지 `^7.2.16` -> `7.2.15`로 수정한다. 그리고 `npm i`
3. `npx @angular/cli@7 update @angular/cli@7 @angular/core@7 @angular/material@7.0.0`

(=> 이것저것 하다가 우연히 되는듯한 느낌..  
core가 없데이트 되는게 아니면 material 13으로 올라가더라도 기존 버전으로 내려도 될 것 같기도 하고..)

# 7.0 -> 8.0

> node version: 10.13 이상  
local에서는 12.22.7버전을 사용함.

```
npx @angular/cli@8 update @angular/cli@8 @angular/core@8

npx @angular/cli@8 update @angular/material@8
또는
npx @angular/cli@8 update @angular/material@8 --allow-dirty
-> Repository is not clean 오류 날 경우(Angular 8 이상& 커밋내역 있는 경우 발생)
```
`@angular/material` import시 deep하게 import하도록 변경됨.  
`@angular/material -> @angular/material/button` material@8로 update하면 자동으로 됨.
```
** Executing migrations of package '@angular/material' **
> Updates Angular Material to v8.
  ✓  Updated Angular Material to version 8
```
```
TypeScript project "src/tsconfig.spec.json" has syntactical errors which could cause an incomplete migration. Please fix the following failures and rerun the migration:
node_modules/@types/node/assert.d.ts(12,72): error TS1144: '{' or ';' expected.
...
```
### 참고-> Migration can be rerun with: `ng update @angular/core --from 7 --to 8 --migrate-only`


## CSS 변경
`/deep/` -> `::ng-deep`


## Repository is not clean 오류(Angular 8 버전부터)
> Repository is not clean. Update changes will be mixed with pre-existing changes.

일부 아래와 같은 문구가 나오면서 버전 업데이트가 안되는 경우가 있다.
(리포지토리에 수정되거나 추적되지 않은 파일이 포함된 경우 커밋 막음)  
그러면 아래의 방법으로 `--allow-dirty`를 추가해서 명령어 호출한다.

-> `--allow-dirty`를 추가해서 명령어 실행

---
# 8.0 -> 9.0
```
npx @angular/cli@9 update @angular/core@9 @angular/cli@9
npx @angular/cli@9 update @angular/material@9 --allow-dirty
```

v9 부터는 기본 컴파일러로 AOT를 사용한다.  
만약 컴파일시 오류가 난다면 기존 View Engine 컴파일러를 사용 하도록 한다.

### `angular.json` -> aot: false로 변경
```
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "aot": false,
```

### `tsconfig.app.json` -> 아래 코드 추가 
```
  "angularCompilerOptions": {
    "enableIvy": false
  }
```

---
# 9.0 -> 10.0

> node version: 12 이상

`npm ls` 명령어를 통해 필요한 의존성 목록을 확인할 수 있다.

```
npx @angular/cli@10 update @angular/core@10 @angular/cli@10
npx @angular/cli@10 update @angular/material@10 --allow-dirty
```

v10 부터는 CommonJS 모듈 방식을 사용하는 경우 warning을 표시한다.  
CommonJS 모듈 방식은 애플리케이션 최적화 단계에서 코드 압축 기능을 활용할 수 없기 때문에
빌드 결과물의 크기가 상대적으로 더 크다.

> WARNING in C:\Users\...ts depends on 'lodash'. CommonJS or AMD dependencies can cause optimization bailouts

해결 방법은 2가지다.  
1) ECMAScript 모듈 방식으로 구현된 패키지를 사용하거나(권장)  
2) warning을 허용하는 경우가 있다.

### 아래는 2번 적용하는 경우 - angular.json - build 옵션 추가
```json
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
     "allowedCommonJsDependencies": [
        "lodash"
     ]
     ...
   }
   ...
},
```
> 참고: [CommonJS 패키지 관리 - Angular공식문서](https://angular.kr/guide/build#configuring-commonjs-dependencies)

---
# 10.0 -> 11.0
```
npx @angular/cli@11 update @angular/core@11 @angular/cli@11
npx @angular/cli@11 update @angular/material@11 --allow-dirty
```

---
# 11.0 -> 12.0
```
npx @angular/cli@12 update @angular/core@12 @angular/cli@12
npx @angular/cli@12 update @angular/material@12 --allow-dirty
```

12 버전 부터는 View Engine compiler가 deprecated 되었다.
> Project is attempting to disable the Ivy compiler. Angular versions 12 and higher do not support the deprecated View Engine compiler for applications. The Ivy compiler will be used to build this project.  
For additional information or if the build fails, please see https://angular.io/guide/ivy

### tsconfig.app.json -> `"enableIvy": true`
```json
  "angularCompilerOptions": {
    "enableIvy": true
  }
```

### angular.json -> `"aot": true`
```json
"architect": {
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "aot": true,
...
```

---
# 12.0 -> 13.0

```shell
npx @angular/cli@13 update @angular/core@13 @angular/cli@13
npx @angular/cli@13 update @angular/material@13
```
