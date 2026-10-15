import pena from '../assets/pena-rodrasp-icone.svg'

// Ícone do login. O desenho está em src/assets/pena-rodrasp-icone.svg (é só trocar esse ficheiro).
// O tamanho muda-se em "height"; a largura acompanha.
export default function LoginIcon() {
  return <img src={pena} alt="" height={26} style={{ height: 26, aspectRatio: '1.386' }} />
}
