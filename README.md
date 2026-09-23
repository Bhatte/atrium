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

## Your own work

Keep your lab notes and write-ups in a folder called `my-work` inside this
folder. Copy each week's template from `labs/` into it and fill in the copy.
Git ignores `my-work`, so `git pull` never changes or conflicts with your notes.

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

**`npm ci` fails.** Check your Node version is 24 or newer. If you are on a
university or office network, it may be blocking the download. Try a different
network.

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

If you are still stuck, bring it to class. Setup problems are never the point of
the exercise, and there is always another way to do the work.
