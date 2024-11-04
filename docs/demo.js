import { configure, fs as fsOrig } from '@zenfs/core'
import { Zip } from '@zenfs/zip'

const fs = fsOrig.promises

const data = await fetch('example-fake-zip-file-1mb.zip').then((r) => r.arrayBuffer())

await configure({
  mounts: {
    '/zip': { backend: Zip, data },
    '/mnt/zip': { backend: Zip, data },
    '/very/deep/structure/zip': { backend: Zip, data }
  }
})

console.log('non-recursive list of /mnt/zip')
console.log(await fs.readdir('/mnt/zip'))
// works ok

console.log('non-recursive list of /very/deep/structure/zip')
console.log(await fs.readdir('/very/deep/structure/zip'))
// works ok

console.log('non-recursive list of /')
console.log(await fs.readdir('/'))
// incorrectly outputs only ['zip']

console.log('recursive list of /')
console.log(await fs.readdir('/', { recursive: true }))
// throws error about /zip missing
