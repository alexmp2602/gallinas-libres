"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

export default function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón Hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
        className="md:hidden p-2 rounded hover:bg-orange-100 active:scale-95 transition-transform duration-150"
      >
        <Bars3Icon className="h-7 w-7 text-orange-600" />
      </button>

      {/* Menú Móvil Drawer */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setIsOpen}
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white/80 backdrop-blur-md border-l border-neutral-200 shadow-2xl p-8 flex flex-col space-y-8"
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
              className="absolute top-6 right-6 p-2 rounded hover:bg-orange-100 active:scale-95 transition-transform duration-150"
            >
              <XMarkIcon className="h-7 w-7 text-orange-600" />
            </button>

            {/* Enlaces con microinteracción */}
            <nav className="mt-12 flex flex-col space-y-6 text-right">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#nosotros"
                className="text-lg font-medium hover:text-orange-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#produccion"
                className="text-lg font-medium hover:text-orange-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Producción
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contacto"
                className="text-lg font-medium hover:text-orange-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </motion.a>
            </nav>
          </motion.div>
        </Dialog>
      </Transition>
    </>
  );
}
