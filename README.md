# GenerationQ
GenerationQ (for "image generation queue") is a cross-platform desktop application designed to provide a general purpose GUI for generating images via text2img and img2img models. Its primary target is Stable Diffusion but since there is such a variety of forked programs with their own particularities, the UI for configuring image generation tasks remains generic enough to work with just about any script.

Where it differs from a CLI (beyond just being visual) is that it manages a queue for you of generation tasks to be run, and gives a nice UI for prepping input images for img2img—and comes with an in-app "gallery" and a place to review completed tasks.

NOTE: in its current state the project is strictly the Electron desktop app, the UI / UI-state management, and a little work on setting up communication that will be needed between Node and Renderer processes to actually connect up to image generation scripts. **It is not functional for image generation yet!**

I did the parts that require specialized knowledge around UI/UX/JS-frontend-stuff/Electron, and figure people who are more on the ML side of things (or just other programmers more generally) would not have too hard a time picking up from here. This README includes additional sections to facilitate that process.

Please do whatever you'd like with the source, I just put this together to continue the spirit of good will from the Stable Diffusion release.


https://user-images.githubusercontent.com/3360318/190328755-33c2236d-e607-4036-8351-4e4c3ec965e9.mov

## How to run

- `yarn install`
- `yarn dev`

## How to build

- `yarn build`

Note: The project is currently configured to use Electron-Forge, which I personally have not had good luck with (came with boilerplate I used to bootstrap project). And, the one time I tried making a production build for GenerationQ, the executable seemed overly large and the startup time was ludicrous (running dev server was quicker). I would recommend switching it over to [Electron Builder](https://www.electron.build/).

## Architecture overview

If you've never used Electron before, the first thing you need to know is that it manages two separate processes: one of them is a Node process and the other is a Chromium javascript process, and the two have to pass messages to each other (Electron docs cover this).

The two processes are called Node and Renderer.

The next bit is going to cover the top-level interactions between the program's core structures:
- `GenerationTask.ts`
- `queueProcessor.ts`
- `store.ts` (Zustand)
- `preload.js`
- `app.ts`

Top-level: the Renderer process creates `GenerationTask` objects which include all the information configured by a user to specify their image generation task—including a shell command to execute and arguments passed to it—and it sends these `GenerationTask`s to the Node process by invoking `window.electronAPI.sendNextGenerationTask(task)`.

More specifically, that call is made by `queueProcessor.js` which has an always running loop that checks whether the main task queue (located in `store.ts`) includes any `GenerationTask`s whose status is `READY` (the `GenerationTask`s are created/configured via `GenerationTaskEditor.tsx`).

Where does `window.electronAPI.sendNextGenerationTask(task)` come from? It is defined within `preload.js`; this is where all the functions mediating communication between the Node and Renderer processes must be defined. Presently includes only one other function `handleGenerationTaskProgress` which is invoked in `app.ts` (which executes on the Node side), sending accummulated terminal output to the Renderer process so it can display it to the user (and potentially some other kind of e.g. % complete info later).

Aside from that, the UI is composed of a handful of React components, and the app's core state is held within a Zustand store (`store.js`).

## What needs to be done

The very first and most interesting thing to do would be getting it actually working. And the first step in doing that would be to provide a real implementation of `handleNextGenerationTask(e, genTask)` in `app.ts`. Currently it just triggers a process to start sending fake terminal output to the Renderer for demo purposes; a real implementation would most likely use Node's `child_process.exec(...)` to execute the command and args stored in `GenerationTask`s passed to `handleNextGenerationTask`.

After this, if the intent is to remain generation model/script-agnostic, a potential difficulty arises: how do you determine where the generated file is located once it's generated? The best I could think to do was have `GenerationTask`s store an `.outputDir` which the node process would scan after a command completes in attempt to locate the new file. (Typically the terminal output will include the generated file name which will make things easier; but if this somewhat-iffy procedure ends up failing in some edge case, the UI at least is able to present that fact to users...)

With those two steps completed the program should be fully functional for a wide range of image generation setups. (There are also a number of logic next steps on the UI side, and it may be worth taking a look at `todo.txt` for some suggestions. Currently they are just notes to myself and possibly illegible, but if someone were to e.g. create an issue for me to expand and create issues for items in there I'd probably do it :)
