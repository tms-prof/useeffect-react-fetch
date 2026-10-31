import { useState, useEffect } from "react";

export default function Usuario() {
  const [userId, setUserId] = useState(1);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        return res.json();
      })
      .then(dados => setUsuario(dados))
      .catch(e => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [userId]); // <- refaz o fetch sempre que userId mudar

  return (
    <div className="usuario">
      <h2>Usuário #{userId}</h2>
      <div>
       <button onClick={() => setUserId(userId - 1)}>Anterior</button>
       <button onClick={() => setUserId(userId + 1)}>Próximo</button>
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {usuario && !carregando && (
        <ul>
          <li>Nome: {usuario.name}</li>
          <li>Email: {usuario.email}</li>
        </ul>
      )}
    </div>
  );
}
