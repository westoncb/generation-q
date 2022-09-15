# GenerationQ
GenerationQ (for "image generation queue") is a cross-platform desktop application (screens below) designed to provide a general purpose GUI for generating images via text2img and img2img models. Its primary target is Stable Diffusion but since there is such a variety of forked programs with their own particularities, the UI for configuring image generation tasks is designed to be generic enough to accommodate just about any script (even non-SD models).

Where it differs from a CLI (beyond just being visual) is that it manages a queue for you of generation tasks to be run, and gives a nice UI for prepping input images for img2img—and comes with an in-app "gallery" and a place to review completed tasks.

NOTE: **This is not functional for actual image generation yet!** I did the parts that require specialized knowledge around UI/UX/JS-frontend-stuff/Electron, and figure others who aren't particularly into that stuff but want a nice UI might pick up from here. This README includes additional sections to facilitate that process.

----

Please do whatever you'd like with the source, I just put this together to continue the spirit of good will from the Stable Diffusion release (plus the design reflects what I want to use for image generation myself, so imo it should exist). If people want to add PRs here rather than forking... I'd participate as time allows, but I've never really done anything with open source + have a bit too much going on already. Feel free to message me with questions though.

## Contents
- [How to run](#run)
- [How to build](#build)
- [Architecture overview](#architecture)
- [Next steps](#next_steps)

----

<img src="https://user-images.githubusercontent.com/3360318/190360594-ca0e7da6-0a02-4160-aeb6-d920e15bdb8c.png" width="320"/>    <img src="https://user-images.githubusercontent.com/3360318/190360611-a55b3fe6-4959-444f-bb73-76ab8c43b2ba.png" width="320"/>

<img src="https://user-images.githubusercontent.com/3360318/190360618-95046e36-9c42-4bbb-b68b-fb915bcec61f.png" width="320"/>  <img src="https://user-images.githubusercontent.com/3360318/190360623-0125482d-5c86-497d-a82c-05b5684cefac.png" width="320"/>

<a name="run"/>

## How to run

- `yarn install`
- `yarn dev`

<a name="build"/>

## How to build

- `yarn build`

Note: The project is currently configured to use Electron-Forge, which I personally have not had good luck with (came with boilerplate I used to bootstrap project). And, the one time I tried making a production build for GenerationQ, the executable seemed overly large and the startup time was ludicrous (running dev server was quicker). I would recommend switching it over to [Electron Builder](https://www.electron.build/).

<a name="architecture"/>

## Architecture overview

If you've never used Electron before, the first thing you need to know is that it manages two separate processes: one of them is a Node process and the other is a Chromium javascript process, and the two have to pass messages to each other (Electron docs cover this, but they're a bit involves; can probably just follow the pattern already in place).

The two processes are called Node and Renderer.

The next bit is going to cover the top-level interactions between the program's core structures:
- `GenerationTask.ts`
- `queueProcessor.ts`
- `store.ts` (Zustand)
- `preload.js`
- `app.ts`

The Renderer process creates `GenerationTask` objects which include all the information configured by a user to specify their image generation task—including a shell command to execute and arguments passed to it—and it sends these `GenerationTasks` to the Node process by invoking `window.electronAPI.sendNextGenerationTask(task)`.

More specifically, that call is made by `queueProcessor.js` which has an always running loop that checks whether the main task queue (located in `store.ts`) includes any `GenerationTasks` whose status is `READY` (the `GenerationTasks` are created/configured via `GenerationTaskEditor.tsx`).

Where does `window.electronAPI.sendNextGenerationTask(task)` come from? It is defined within `preload.js`; this is where all the functions mediating communication between the Node and Renderer processes must be defined. Presently includes only one other function `handleGenerationTaskProgress` which is invoked in `app.ts` (which executes on the Node side), sending accummulated terminal output to the Renderer process so it can display it to the user (and potentially some other kind of e.g. % complete info later).

Aside from that, the UI is composed of a handful of React components, and the app's core state is held within a Zustand store (`store.js`).

<a name="next_steps"/>

## Next steps

The very first and most interesting thing to do would be getting it actually working. And the first step in doing that would be to provide a real implementation of `handleNextGenerationTask(e, genTask)` in `app.ts`. Currently it just triggers a process to start sending fake terminal output to the Renderer for demo purposes; a real implementation would most likely use Node's `child_process.exec(...)` to execute the command and args stored in `GenerationTasks` passed to `handleNextGenerationTask`.

After this, if the intent is to remain generation model/script-agnostic, a potential difficulty arises: how do you determine where the generated file is located once it's generated? The best I could think to do was have `GenerationTasks` store an `.outputDir` which the node process would scan after a command completes in attempt to locate the new file. (Typically the terminal output will include the generated file name which will make things easier; but if this somewhat-iffy procedure ends up failing in some edge case, the UI at least is able to present that fact to users...)

With those two steps completed the program should be fully functional for a wide range of image generation setups. (There are also a number of logical next steps on the UI side, and it may be worth taking a look at `todo.txt` for some suggestions. Currently they are just notes to myself and possibly illegible, but if someone were to e.g. create an issue for me to expand and create issues for items in there I'd probably do it :)
