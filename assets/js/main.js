$(document).ready(() => {
  const FAVOAPI_URL = "http://192.168.1.42:3000/api";
  const POKEAPI_URL = "https://pokeapi.co/api/v2";
  const POKEAPI_GEN_URL = POKEAPI_URL + "/generation";
  const POKEAPI_IMG_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";

  const $body = $("body");

  // Obtener el nombre de la pagina actual
  const page = location.pathname
    .split("/")
    .pop()
    .split("?")
    .shift()
    .replace(".html", "");

  function redirect(page) {
    location.replace(page + ".html");
  }

  function isSignedIn() {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      return true;
    }
  }

  function signOut() {
    sessionStorage.clear();
  }

  function getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function getPokemonId(pokemonURL) {
    return pokemonURL.slice(0, -1).split("/").pop();
  }

  switch (page) {
    // Si la pagina es signup.html, controlar el submit del formulario.
    case "signup": {
      // Si ya esta logeado:
      if (isSignedIn()) {
        // Redireccionar a pokemons favoritos
        redirect("pokemonfavorite");
        return;
      }

      $("form").on("submit", (e) => {
        e.preventDefault();
        const data = getFormData(e.target);

        // Petición a nuestra API
        fetch(FAVOAPI_URL + "/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            $body.addClass("success");

            setTimeout(() => {
              // Redireccionar al login
              redirect("login");
            }, 5000);
          });
      });

      break;
    }

    case "login": {
      // Si ya esta logeado:
      if (isSignedIn()) {
        // Redireccionar a favoritos
        redirect("pokemonfavorite");
        return;
      }

      $("form").on("submit", (e) => {
        e.preventDefault();
        const data = getFormData(e.target);

        // Petición a nuestra API
        fetch(FAVOAPI_URL + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // Guardar el token y la data del usuario en el sessionStorage.
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.userId);

            // Redireccionar a favoritos
            redirect("pokemonfavorite");
          })
          .catch((error) => {
            $body.addClass("error");
            $("#message").text(error);
          });
      });

      break;
    }

    case "pokemonlist": {
      // Si el usuario NO esta logeado.
      if (!isSignedIn()) {
        // Redireccionar al login.
        redirect("login");
        return;
      }

      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");

      // Consultar a la POKEAPI_GEN.
      fetch(POKEAPI_GEN_URL + "/1")
        .then((response) => response.json())
        .then((data) => {
          const $select = $("#pokemons-selector");
          const $pokemonImg = $("#pokemon-img");
          const $pokemonName = $("#pokemon-name");
          const $addToFavorites = $("#add-to-favorites");

          $addToFavorites.on("click", () => {
            // Consultar a nuestra API
            fetch(FAVOAPI_URL + "/users/" + userId + "/favorites", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({
                pokemonId: $select.val(),
                pokemonName: $select.find(":selected").text(),
              }),
            });
          });

          data.pokemon_species.forEach((pokemon) => {
            // Creamos y agregamos un option por cada nombre.
            const $option = $(
              `<option value="${getPokemonId(pokemon.url)}">${
                pokemon.name
              }</option>`
            );
            $select.append($option);
          });

          $select.on("change", async () => {
            const pokemonId = $select.val();
            const pokemonName = $select.find(":selected").text();
            $pokemonName.text(pokemonName);
            $pokemonImg.attr("src", POKEAPI_IMG_URL + "/" + pokemonId + ".svg");
          });

          return;

          // Consultar a la nuestra API FAVOAPI.
          fetch(FAVOAPI_URL + "/users/" + userId + "/favorites", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          })
            .then((response) => response.json())
            .then((favorites) => {
              // Pintar el background si el pokemon esta en favorites.
            });
        });

      break;
    }

    case "pokemonfavorite": {
      // Si el usuario NO esta logeado.
      if (!isSignedIn()) {
        // Redireccionar al login.
        redirect("login");
        return;
      }

      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");

      fetch(FAVOAPI_URL + "/users/" + userId + "/favorites", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((favorites) => {
          // Para guardar un favorito desde la lista de pokemones se debe:
          // - Consultar a https://pokeapi.co/api/v2/generation/1
          // - Guardar un objeto { name: "charmander", id: "4" } sacando el id
          //   de la URL ("https://pokeapi.co/api/v2/pokemon-species/1/")
          // favorites = [{ name: "charmander", id: "4" }];

          if (!favorites.length) {
            return;
          }

          const $list = $("#list");
          $list.empty();
          favorites.forEach((pokemon) => {
            // En cada card se debe mostrar el nombre y la foto
            $list.append(`
              <div class="favorite-card">
                <figure>
                  <img src="${POKEAPI_IMG_URL + "/" + pokemon.id}.svg" />
                </figure>
                <h4>${pokemon.name}</h4>
                <button>Eliminar</button>
              </div>
            `);
          });
        });

      break;
    }

    default:
      break;
  }
});
