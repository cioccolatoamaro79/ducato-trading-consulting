# Ducato Trading Consulting — Gestione circolari

## Stato della consegna
Il sito, l’archivio, le ultime tre circolari in homepage e `/admin/` sono inclusi. **La pubblicazione dal pannello richiede ancora la connessione a un repository GitHub:** non basta caricare lo ZIP una volta su Netlify.

## Configurazione una tantum
1. Crea un repository GitHub dedicato, preferibilmente privato, con i file di questo pacchetto alla radice (inclusi `index.html`, `admin/config.yml`, `contenuti/circolari.json`).
2. In `admin/config.yml`, sostituisci `REPLACE_OWNER/REPLACE_REPO` con `nomeutente/nomerepository` e verifica che il branch sia `main`.
3. In Netlify, collega il repository al progetto attuale tramite la funzione di deploy da repository/Git (non creare un sito separato). Verifica che la directory di pubblicazione sia la radice `.`. Dopo il collegamento, ogni commit deve produrre un nuovo deploy.
4. Crea un account GitHub per Elisabetta o autorizza il suo account esistente con permessi di scrittura nel repository. La pagina `/admin/` usa Sveltia CMS: `Sign in with token` permette di autenticarsi con un GitHub Personal Access Token con accesso *solo* a questo repository e permesso `Contents: Read and write`.
5. Il token è una credenziale personale: non inviarlo per email, non inserirlo nel sito e non salvarlo nel repository. Preferire un account dedicato e un token con scadenza. Per un login più semplice senza token è necessaria una configurazione OAuth separata.
6. Apri `https://ducatoconsulting.it/admin/` e controlla che sia disponibile "Circolari e aggiornamenti". Crea una circolare con `Pubblicato = false`, salva, poi abilita `Pubblicato = true`, salva nuovamente e verifica il deploy Netlify.
7. Nella homepage compariranno **le ultime tre circolari pubblicate**, ordinate per data. L’archivio `/circolari.html` è filtrabile per categoria. Le singole circolari usano `/circolare.html?id=...`.

## Sicurezza e controllo editoriale
- Il pannello `/admin/` è pubblico come pagina, ma la scrittura richiede autorizzazione GitHub. Non confondere `noindex` con protezione di accesso.
- I contenuti sono da revisionare prima di impostare `Pubblicato = true`. Usa riferimenti ufficiali; non inserire dati personali dei clienti.
- Non cambiare mai l'`id` dopo la pubblicazione, per non rompere i collegamenti.
- Per notifiche form Netlify, il modulo contatti rimane quello della versione precedente; verifica le notifiche e la consegna email a parte.

## Alternative per una gestione futura più semplice
L'autenticazione con token è una prima implementazione funzionante, ma per Elisabetta consiglierei successivamente login OAuth tramite provider autorizzato, evitando l'uso ripetuto di token personali.
