import React from 'react'
import wallet from '../../assets/img/icons/wallet.png'

interface ComplusIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const ComplusIcon: React.FC<ComplusIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    <img src={wallet} height={48} alt="Wallet" />
  </span>
)

export default ComplusIcon
