# LapNow-
LapNow is a simple mobile app that connects buyers of laptops to those that want to sell laptops

# ARTICLE FOR HASHING,SALTING AND ENCRYPTION

# Major Differences Between Encryption, Hashing, and Salting

Securing sensitive application data requires choosing the right cryptographic tool for the job. While **encryption**, **hashing**, and **salting** are often discussed together, they operate on different principles and solve distinct problems.

---

### Core Concepts

 **Encryption (Two-Way):** Transforms plaintext into ciphertext using an encryption key. It is fully **reversible**—anyone with the correct key can decrypt the data back to its original form. Common algorithms include AES and RSA.
 **Hashing (One-Way):** Transforms data into a unique, fixed-length fingerprint (hash digest). It is strictly **irreversible** and deterministic: the same input always yields the exact same hash. Common algorithms include SHA-256 and MD5.
 **Salting (Security Modifier):** Appends a cryptographically random string to a password *before* hashing. It ensures that two users with identical passwords end up with completely different stored hashes, rendering precomputed lookup attacks (rainbow tables) useless.

---

### Key Comparison

| Feature | Encryption | Hashing | Salting |

 **Direction** | Two-way (Reversible) | One-way (Irreversible) | Modifier (Appended to input) |
 **Key / Secret** | Requires an encryption key | No key required | Uses random unique bytes |
 **Primary Goal** | Data confidentiality | Data integrity & verification | Defeating rainbow tables |
 **Best Used For** | Credit cards, chat messages, HTTPS | File checksums, digital signatures | Password storage (e.g., via `bcrypt`)
 
 # https://docs.google.com/forms/u/0/d/e/1FAIpQLScUYyUozbXBCNVb58BSsXd17NUrsukQ3rERZYesAjUvKOlJSQ/formResponse

