# Contributing to 'vue-ethereum'

## Bugs

> The ideal GitHub issue (and even some feature requests) is not an issue, it's a PR with a failing test case.
<br/> [@rauchg](https://twitter.com/rauchg/status/810589655532007424)

**Before filing an issue please [search the issue tracker](https://github.com/vdg/vue-ethereum/issues); your issue may have already been discussed or fixed in `master`.**

**If you want your issue to get priority, submit it as a PR instead**

**Fill in the template** provided by the issue tracker, try to be as **clear** and **complete** as possible, providing a **[Short, Self Contained, Correct (Compilable), Example (SSCE)](http://sscce.org/)** (**link** to a **repository**) helps a lot .

## Feature / Enhancement Requests

Feature or enhancement requests should be **submitted** in the
[issue tracker](https://github.com/vdg/vue-ethereum/issues), with a **description** (follow the template) of the expected behavior & use case, where they’ll remain until **approval** by the **lead maintainer(s) and/or enough interest** from the **community**.

You can **request** a feature by **writing a pull request**, but this is **no guarantee** it will be **merged**.

<!--
## 'help wanted' label

There are issues marked with the **['help wanted'](https://github.com/vdg/vue-ethereum/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)** label. <br/>This is a perfect start if you want to help out with the further development of rouge.
-->

## Pull Requests (PR)

In general, the contribution workflow looks like this:

1. **Fork** the repo.
2. **Clone** the repo. `git clone https://github.com/your-username/vue-ethereum.git`.
3. Create a **new branch** based off the master branch, provide a **descriptive name** <br/>(ex. '**feat**-add-better-logging', '**bug**-removed-double-method', '**enh**-bumped-eslint')
4. Before running the code you’ll need to **install** the **dependencies** (`yarn install` or `npm install`).
5. **Implement** your feature / bugfix (using the **watch scripts**), you should **only need to modify `/src`**. Don’t worry about regenerating the build folder `/dist`, it is **built** in the **prepublish** phase.
6. Submit a **PR**, referencing what it addresses.
7. Please try to keep your **PR focused in scope and avoid including unrelated commits**.

After you have submitted your PR, we'll try to **get back to you as soon as possible**. <br/>We will **review** your PR and might **request changes**.

## Coding Guidelines

Please **follow** the **conventions** already established in the code.

Guidelines are enforced using **[ESLint](http://eslint.org/)**.


You can **run the linting script** by using

```console
$ yarn run lint
```
