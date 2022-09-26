import * as core from '@actions/core'
import { replaceTextWithText } from './replace'

function getFiles(): string[] {
    const files =
      core.getInput('files', {
        required: true
      }) || ''
    if (files.trim().startsWith('[')) {
      return JSON.parse(files)
    }
  
    return [files]
  }

  async function run () {
    try {
        const searchText = core.getInput('searchText')
        const replaceText = core.getInput('replaceText')
        const files = getFiles()
        var replaceCount;

        const { replaceCount, result } = await replaceTextWithText(
            searchText,
            replaceText,
            Array.isArray(files) ? files : [files]
        )
    
        core.setOutput('replaceCount', replaceCount)
        console.log(`Replaced ${replaceCount} tokens in files: ${result}`)
      } catch (error) {
        core.setFailed(error.message)
      }
  }

  run ()