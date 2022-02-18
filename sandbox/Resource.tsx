// resource.js
import React from 'react'
import { Loading } from '../presentational/elements/loading/Loading'
import { useResource, getResource } from '../queries/resource'

interface IResourceProps {
  id: string
}

export const Resource: React.FunctionComponent<IResourceProps> = ({ id }) => {
  getResource(id)
  const { data } = useResource(id)
  if (!data) return <Loading />
  return <p>{data.url}</p>
}
