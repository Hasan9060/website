import { createClient } from 'next-sanity'


export const client = createClient({
  projectId: '2srh4ekv',
  dataset: 'production',
  apiVersion: 'skz6lWFJkAgpfrjXgwK8Tb6UBsTpRcSwzsQawON5Qps118XQdODrtVLdyXySTgJqC7rhPUKAOzb9prGs2aORcV0IICFN6pLKCLW2G0P7u5rExc8E92fzYp0UMuro6VpCzm51svtpWMCniHWaEiZAeJApDrYyIXgO5Uar4GLM2QPxFsswwZnU',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
