import type { JobDetailParams, JobDetail } from '@/types/job'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { fetchJobs } from './job-api'
import { JOBS } from './query-keys'

export const useJobs = (jobId: number) => {
  const { data: jobDetail, ...rest } = useQuery<JobDetail, AxiosError>({
    queryKey: [JOBS, jobId],
    queryFn: () => fetchJobs(jobId),
    retry: false,
  })

  return { jobDetail, ...rest }
}
