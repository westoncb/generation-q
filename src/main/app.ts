import { app, BrowserWindow, ipcMain } from "electron"
import { createAppWindow } from "./appWindow"

/** Handle creating/removing shortcuts on Windows when installing/uninstalling. */
if (require("electron-squirrel-startup")) {
    app.quit()
}

function wait(time) {
    return new Promise((resolve: (unknown?) => void) =>
        setInterval(() => resolve(), time)
    )
}

let termOutOffset = 0
function getTermOut() {
    const length = 50
    const str = fakeTerminalOutput.slice(termOutOffset, termOutOffset + length)
    termOutOffset = (termOutOffset + length) % fakeTerminalOutput.length
    return str
}

async function handleNextGenerationTask(event, task) {
    await new Promise(async (resolve, reject) => {
        for (let i = 0; i < 250; i++) {
            await wait(100)
            sendProgress({ taskId: task.id, terminalOutput: getTermOut() })
        }
        resolve(null)
    })
    // throw new Error("well there was a problem")
    return "this the result"
}

let appWindow
function sendProgress(info) {
    appWindow?.webContents.send("generation-task-progress", info)
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.whenReady().then(() => {
    ipcMain.handle("nextGenerationTask", handleNextGenerationTask)

    appWindow = createAppWindow()

    /**
     * Emitted when the application is activated. Various actions can
     * trigger this event, such as launching the application for the first time,
     * attempting to re-launch the application when it's already running,
     * or clicking on the application's dock or taskbar icon.
     */
    app.on("activate", () => {
        /**
         * On OS X it's common to re-create a window in the app when the
         * dock icon is clicked and there are no other windows open.
         */
        if (BrowserWindow.getAllWindows().length === 0) {
            createAppWindow()
        }
    })
})

/**
 * Emitted when all windows have been closed.
 */
app.on("window-all-closed", () => {
    /**
     * On OS X it is common for applications and their menu bar
     * to stay active until the user quits explicitly with Cmd + Q
     */
    if (process.platform !== "darwin") {
        app.quit()
    }
})

const fakeTerminalOutput = `self_attn.v_proj.weight', 'vision_model.encoder.layers.21.self_attn.q_proj.bias', 'vision_model.encoder.layers.6.layer_norm1.weight', 'vision_model.encoder.layers.3.layer_norm2.bias', 'vision_model.encoder.layers.16.layer_norm2.weight', 'vision_model.encoder.layers.12.layer_norm2.weight', 'vision_model.encoder.layers.23.layer_norm2.weight', 'vision_model.encoder.layers.17.mlp.fc1.weight', 'vision_model.encoder.layers.4.mlp.fc1.weight', 'vision_model.encoder.layers.20.mlp.fc1.weight', 'vision_model.encoder.layers.17.self_attn.k_proj.weight', 'vision_model.encoder.layers.16.layer_norm1.bias', 'vision_model.encoder.layers.8.mlp.fc1.weight', 'vision_model.encoder.layers.16.layer_norm2.bias', 'vision_model.encoder.layers.17.layer_norm1.bias', 'vision_model.encoder.layers.16.self_attn.v_proj.weight', 'vision_model.encoder.layers.20.self_attn.v_proj.bias', 'vision_model.encoder.layers.6.self_attn.out_proj.weight', 'vision_model.encoder.layers.18.self_attn.v_proj.bias', 'vision_model.encoder.layers.14.self_attn.k_proj.bias', 'vision_model.encoder.layers.20.self_attn.k_proj.weight', 'vision_model.encoder.layers.7.mlp.fc1.bias', 'vision_model.encoder.layers.11.self_attn.v_proj.bias', 'vision_model.encoder.layers.8.mlp.fc2.weight', 'vision_model.encoder.layers.22.self_attn.v_proj.bias', 'vision_model.encoder.layers.9.mlp.fc1.bias', 'vision_model.encoder.layers.13.self_attn.q_proj.bias', 'vision_model.encoder.layers.6.mlp.fc2.weight', 'vision_model.encoder.layers.6.mlp.fc1.weight', 'vision_model.encoder.layers.18.layer_norm2.weight', 'vision_model.encoder.layers.21.layer_norm1.weight', 'vision_model.encoder.layers.2.self_attn.q_proj.bias', 'vision_model.encoder.layers.5.layer_norm2.weight', 'vision_model.encoder.layers.18.layer_norm1.bias', 'vision_model.encoder.layers.22.self_attn.v_proj.weight', 'vision_model.encoder.layers.3.self_attn.k_proj.weight', 'vision_model.encoder.layers.19.layer_norm2.bias', 'vision_model.encoder.layers.1.layer_norm1.weight', 'vision_model.encoder.layers.20.mlp.fc2.bias', 'vision_model.encoder.layers.17.layer_norm2.bias', 'vision_model.post_layernorm.bias', 'vision_model.encoder.layers.4.layer_norm1.bias', 'vision_model.encoder.layers.12.self_attn.q_proj.weight', 'vision_model.encoder.layers.23.self_attn.q_proj.bias', 'vision_model.encoder.layers.5.self_attn.v_proj.weight', 'vision_model.embeddings.class_embedding', 'vision_model.encoder.layers.7.layer_norm2.weight', 'vision_model.encoder.layers.8.self_attn.v_proj.bias', 'vision_model.encoder.layers.3.layer_norm1.weight', 'vision_model.encoder.layers.21.self_attn.q_proj.weight', 'vision_model.encoder.layers.5.self_attn.q_proj.bias', 'vision_model.encoder.layers.0.layer_norm2.weight', 'vision_model.encoder.layers.5.mlp.fc1.bias', 'vision_model.encoder.layers.14.layer_norm1.bias', 'vision_model.encoder.layers.12.mlp.fc2.weight', 'vision_model.encoder.layers.8.self_attn.k_proj.bias', 'vision_model.encoder.layers.23.self_attn.out_proj.weight', 'vision_model.encoder.layers.9.self_attn.k_proj.bias', 'vision_model.encoder.layers.2.self_attn.q_proj.weight', 'vision_model.encoder.layers.15.self_attn.q_proj.bias', 'vision_model.encoder.layers.0.layer_norm2.bias', 'vision_model.encoder.layers.0.self_attn.out_proj.bias', 'vision_model.encoder.layers.18.self_attn.k_proj.bias', 'vision_model.encoder.layers.15.self_attn.v_proj.bias', 'vision_model.encoder.layers.13.mlp.fc1.bias', 'vision_model.encoder.layers.8.layer_norm1.bias', 'vision_model.encoder.layers.20.layer_norm2.weight', 'vision_model.encoder.layers.6.self_attn.q_proj.bias', 'vision_model.encoder.layers.8.self_attn.k_proj.weight', 'vision_model.encoder.layers.16.self_attn.q_proj.bias', 'vision_model.encoder.layers.20.self_attn.v_proj.weight', 'vision_model.encoder.layers.15.layer_norm2.bias', 'vision_model.pre_layrnorm.bias', 'vision_model.encoder.layers.9.self_attn.q_proj.weight', 'vision_model.encoder.layers.17.mlp.fc1.bias', 'vision_model.encoder.layers.12.layer_norm2.bias', 'vision_model.encoder.layers.3.self_attn.out_proj.bias', 'vision_model.encoder.layers.18.self_attn.out_proj.bias', 'vision_model.encoder.layers.22.self_attn.out_proj.bias', 'vision_model.encoder.layers.0.self_attn.q_proj.weight', 'vision_model.encoder.layers.10.self_attn.k_proj.weight', 'vision_model.encoder.layers.16.mlp.fc2.bias', 'vision_model.encoder.layers.14.self_attn.v_proj.weight', 'vision_model.encoder.layers.15.self_attn.k_proj.weight', 'vision_model.encoder.layers.19.mlp.fc2.weight', 'vision_model.encoder.layers.1.self_attn.v_proj.bias', 'vision_model.encoder.layers.11.layer_norm1.bias', 'vision_model.encoder.layers.20.self_attn.q_proj.weight', 'logit_scale', 'vision_model.encoder.layers.21.layer_norm1.bias', 'vision_model.encoder.layers.16.self_attn.out_proj.weight', 'vision_model.encoder.layers.15.self_attn.out_proj.bias', 'vision_model.encoder.layers.1.self_attn.q_proj.bias', 'vision_model.encoder.layers.7.self_attn.k_proj.bias', 'vision_model.encoder.layers.21.self_attn.out_proj.bias', 'vision_model.encoder.layers.19.layer_norm1.weight', 'vision_model.encoder.layers.3.mlp.fc1.weight', 'vision_model.encoder.layers.18.self_attn.q_proj.bias', 'vision_model.encoder.layers.10.self_attn.q_proj.bias', 'vision_model.encoder.layers.4.self_attn.k_proj.bias', 'vision_model.encoder.layers.18.mlp.fc2.bias', 'vision_model.encoder.layers.9.self_attn.out_proj.weight', 'vision_model.encoder.layers.21.layer_norm2.bias', 'vision_model.encoder.layers.9.layer_norm1.bias', 'vision_model.encoder.layers.19.self_attn.v_proj.bias', 'vision_model.encoder.layers.22.layer_norm1.weight', 'vision_model.encoder.layers.13.mlp.fc2.bias', 'vision_model.encoder.layers.5.self_attn.out_proj.weight', 'vision_model.encoder.layers.7.mlp.fc2.weight', 'vision_model.encoder.layers.9.self_attn.k_proj.weight', 'vision_model.encoder.layers.0.mlp.fc1.bias', 'vision_model.embeddings.patch_embedding.weight', 'vision_model.encoder.layers.10.layer_norm1.bias', 'vision_model.encoder.layers.23.self_attn.out_proj.bias', 'vision_model.encoder.layers.9.self_attn.out_proj.bias', 'vision_model.encoder.layers.3.layer_norm1.bias', 'vision_model.encoder.layers.5.self_attn.q_proj.weight', 'vision_model.encoder.layers.13.layer_norm1.weight', 'vision_model.encoder.layers.3.mlp.fc2.bias', 'vision_model.encoder.layers.13.mlp.fc1.weight', 'vision_model.encoder.layers.23.self_attn.k_proj.bias', 'vision_model.encoder.layers.7.self_attn.v_proj.bias', 'vision_model.encoder.layers.15.self_attn.k_proj.bias', 'vision_model.encoder.layers.22.mlp.fc1.bias', 'vision_model.encoder.layers.3.self_attn.out_proj.weight', 'vision_model.encoder.layers.2.self_attn.v_proj.weight', 'vision_model.encoder.layers.20.layer_norm2.bias', 'vision_model.encoder.layers.14.layer_norm2.bias', 'vision_model.encoder.layers.12.self_attn.out_proj.bias', 'vision_model.encoder.layers.12.mlp.fc1.weight', 'vision_model.encoder.layers.1.self_attn.out_proj.bias', 'vision_model.encoder.layers.0.mlp.fc2.weight']
- This IS expected if you are initializing CLIPTextModel from the checkpoint of a model trained on another task or with another architecture (e.g. initializing a BertForSequenceClassification model from a BertForPreTraining model).
- This IS NOT expected if you are initializing CLIPTextModel from the checkpoint of a model that you expect to be exactly identical (initializing a BertForSequenceClassification model from a BertForSequenceClassification model).
Global seed set to 42
Sampling:   0%|                                                                                                                         | 0/1 [00:00<?, ?it/s/Users/westonbeecroft/ml-stuff/stable-diffusion/ldm/modules/embedding_manager.py:152: UserWarning: The operator 'aten::nonzero' is not currently supported on the MPS backend and will fall back to run on the CPU. This may have performance implications. (Triggered internally at /Users/runner/work/_temp/anaconda/conda-bld/pytorch_1662361888252/work/aten/src/ATen/mps/MPSFallback.mm:11.)
  placeholder_idx = torch.where(
Data shape for DDIM sampling is (1, 4, 64, 64), eta 0.0
Running DDIM Sampling with 67 timesteps
DDIM Sampler: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████| 67/67 [04:03<00:00,  3.64s/it]
data: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 1/1 [04:05<00:00, 245.78s/it]
Sampling: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 1/1 [04:05<00:00, 245.78s/it]
Your samples are ready and waiting for you here:
outputs/txt2img-samples

Enjoy.
(ldm) Westons-MacBook-Air ॐ  ~/ml-stuff/stable-diffusion:(3d0h8m|git@main)
4074 ± python scripts/orig_scripts/txt2img.py --prompt "Digital illustration of pretty girl sabrina with short blonde hair wearing a sweater, from alice in wonderland, smoking, in a wonderland forest at night, by ilya kuvshinov, lois van baarle, rossdraws, basquiat" --n_samples 1 --precision full --n_iter 1 --skip_grid --W 512 --H 512 --ddim_steps 64
Loading model from models/ldm/stable-diffusion-v1/model.ckpt
Global Step: 470000
LatentDiffusion: Running in eps-prediction mode
DiffusionWrapper has 859.52 M params.
making attention of type 'vanilla' with 512 in_channels
Working with z of shape (1, 4, 32, 32) = 4096 dimensions.
making attention of type 'vanilla' with 512 in_channels`
