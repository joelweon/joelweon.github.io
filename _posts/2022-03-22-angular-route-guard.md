---
layout:  post
title: Angular guard
tags:
- angular
- guard
---

Route Guard는 라우터를 통해 모듈이나 컴포넌트 접근 제어를 하는 것으로 권한 등을 체크한다.  
Anuglar는 가드를 위한 5개의 인터페이스를 제공한다.

## CanActivate
- `라우트`를 활성화할 수 있는지 결정
- 주로 뷰의 접근 권한을 체크
```typescript
export class GuardSample implements CanActivate {
    canActivate() {
        if (!/*권한체크 로직 수행*/) {
            this.router.navigate(["home"]);
            return false;
        }
        return true;
    }
}
```

### guard 모듈에 등록
```typescript
{path: "/home", component: HomeComponent, canActivate: [GuardSample]}
```
-> canActivate가 true인 경우만 HomeComponent를 활성화한다.

---
## CanActivateChild
- `자식 라우트`를 활성화 할지 결정
- 주로 자식 컴포넌트 접근 제어
```typescript
export class GuardSample implements CanActivateChild {
    canActivateChild() {
        if (!/*권한체크 로직 수행*/) {
            this.router.navigate(["home"]);
            return false;
        }
        return true;
    }
}
```

### guard 모듈에 등록
```typescript
{
    path: "/home",
    component: HomeComponent,
    canActivateChild: [GuardSample],
    children: [
        {path: ":id", component: ChildComponet}
    ]
}
```

---
## CanLoad
- 모듈이 로드되기 전에 `모듈`을 활성화 결정
- 호출 시점에 컴파일하는 lazy loading을 사용하는 경우 canLoad가 false라면 모듈을 컴파일 하지 않는다.
```typescript
export class GuardSample implements CanLoad {
    canLoad() {
        
    }
}
```

---
## Resolve
- 각 라우트의 뷰가 렌더링되기 이전에 뷰가 렌더링되기 위해 필요한 데이터를 로딩할 때 사용
- 호출 시점에 컴파일하는 lazy loading을 사용하는 경우 canLoad가 false라면 모듈을 컴파일 하지 않는다.
```typescript
export class HeroResolver implements Resolve<Hero> {
    constructor(private service: HeroService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Hero>|Promise<Hero>|Hero {
        return this.service.getHero(route.paramMap.get('id'));
    }
}
```

### Resolve 모듈에 등록
```typescript
{
    path: 'base'
    canActivate: [BaseGuard],
    resolve: {data: BaseDataResolver},
    children: [
        {
            path: 'child',
            guards: [ChildGuard],
            component: ChildComponent,
            resolve: {childData: ChildDataResolver}
        }
    ]
}
```
-> 실행 순서는 BaseGuard, ChildGuard, BaseDataResolver, ChildDataResolver

---
## CanDeactivate
- 뷰에서 빠져나갈 때(컴포넌트가 비활성화 될 때) 사용
```typescript
export class GuardSample implements CanDeactivate {
    canDeactivate() {
        // return true/false
    }
}
```

> 참고: [Angular Essentials](http://www.yes24.com/Product/Goods/62063090)
