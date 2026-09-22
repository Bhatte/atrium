# Atrium

Atrium is a small internal staff workspace. It has a staff directory, some shared
documents, and a profile page. You will use it in class throughout this module.

It runs on your own machine. Nothing you do in it leaves your laptop.

## Before you start

You need **Node.js 24 or newer**. Check what you have:

```
node --version
```

If that command is not found, or the number is below 24, install Node 24 from
<https://nodejs.org> and open a new terminal window afterwards.

On Windows, use **PowerShell** or **Command Prompt**. Both work.

## Setting it up

Run these four commands, in this order, from inside the `atrium` folder.

```
npm ci
npm run reset
npm run doctor
npm start
```

Then open <http://localhost:9090> in your browser.

What each one does:

| Command | What it does |
|---|---|
| `npm ci` | Downloads the libraries Atrium needs. Takes a minute the first time. |
| `npm run reset` | Fills the database with the same starting data every time. |
| `npm run doctor` | Checks your setup and tells you if anything is wrong. |
| `npm start` | Starts Atrium on port 9090. Press `Ctrl` and `C` together to stop it. |

## Signing in

Three accounts exist. They are not real people.

| Username | Password | Role |
|---|---|---|
| `alice.nolan` | `SpringRiver44` | staff |
| `bob.keane` | `CopperLane19` | staff |
| `morgan.doyle` | `QuietHarbour08` | administrator |

## Starting again

If you change something and want to go back to the beginning:

```
npm run reset
```

This resets **the data only**. It never touches files you have edited. Your own
changes to the code are safe.

## Checking it still works

```
npm test
```

This checks that Atrium behaves the way it should: signing in works, the
directory lists people, the profile page loads. Run it after you change
something, to see whether you broke anything.

## If something goes wrong

**`npm ci` fails with a certificate error.** The message may say
`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, `SELF_SIGNED_CERT_IN_CHAIN`, or "unable to
verify the first certificate". That means your network is inspecting secure
connections, which office and university networks often do (Zscaler, Forcepoint
and similar). Node keeps its own list of trusted certificates, so it does not
see the network's certificate even though your machine is set up to trust it.

Tell Node to use your own machine's certificate store as well, then run `npm ci`
again in the same terminal window:

```
$env:NODE_USE_SYSTEM_CA = "1"      (Windows PowerShell)
set NODE_USE_SYSTEM_CA=1           (Windows Command Prompt)
export NODE_USE_SYSTEM_CA=1        (macOS and Linux)
```

```
npm ci
```

To switch it on for every new terminal, run `setx NODE_USE_SYSTEM_CA 1` once on
Windows and open a new window, or add `export NODE_USE_SYSTEM_CA=1` to your
`~/.zshrc` on macOS (`~/.bash_profile` if you use bash).

If that does not help, Node can be given the network's root certificate as a
file instead. Ask IT for it in `.pem` form and run one of these, then `npm ci`:

```
$env:NODE_EXTRA_CA_CERTS = "C:\path\to\network-root.pem"    (Windows PowerShell)
set NODE_EXTRA_CA_CERTS=C:\path\to\network-root.pem         (Windows Command Prompt)
export NODE_EXTRA_CA_CERTS=/path/to/network-root.pem        (macOS and Linux)
```

Put quotation marks round the path if it contains spaces. Do not switch off
`strict-ssl` — it is the check that protects you, and it is not what is broken.

The quickest way round it is a network that does not inspect traffic: a home
connection or a phone hotspot, then run `npm ci` there.

**`npm ci` fails with `EPERM` and `rmdir`.** These are usually warnings while npm
cleans up after the failure above. If they do stop `npm ci`, something else was
holding the `node_modules` folder open — antivirus, a cloud-synced folder, or
Atrium still running in another window. Close it, delete the `node_modules`
folder, and run `npm ci` again.

**Port 9090 is already in use.** Something else on your machine is using it.
Close it, or start Atrium on a different port:

```
PORT=9100 npm start          (macOS and Linux)
$env:PORT=9100; npm start    (Windows PowerShell)
```

**The page will not load.** Make sure `npm start` is still running in your
terminal. It has to stay open while you use Atrium.

**Something looks broken and you do not know why.** Run `npm run doctor`. It
checks your setup and says what is wrong.

Still stuck? Bring it to class. Setup problems are never the point of the
exercise, and there is always another way to do the work.
