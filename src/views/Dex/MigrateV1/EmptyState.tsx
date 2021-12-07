import React from 'react'
import { AutoColumn } from '../../../components/Dex/Column'
import { TYPE } from '../../../theme/dexTheme'

export function EmptyState({ message }: { message: string }) {
  return (
    <AutoColumn style={{ minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
      <TYPE.body>{message}</TYPE.body>
    </AutoColumn>
  )
}
