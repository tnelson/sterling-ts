import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { dataReceived } from 'sterling-connection/src/actions';
import { parseAlloyDatum } from 'sterling-connection/src/parse/alloy';
import store from 'sterling/src/state/store';

interface ManualXMLModelProps {
    isOpen: boolean,
    onClose: () => void
}

export const TEXT_manual_entry_modal_add_button = 'Add Datum'
export const TEXT_manual_entry_modal_textarea_label = 'XML Datum'

const placeholderXML = `
<instance bitwidth= "4" maxseq= "-1" command= "example-run" filename= "no-filename.als" version= "1.5.0">
<sig label= "seq/Int" ID= "0" parentID= "1" builtin= "yes"> </sig>
<sig label= "Int" ID= "1" parentID= "2" builtin= "yes"> </sig>
<sig label= "univ" ID= "2" builtin= "yes"> </sig>

</instance>
`

/**
 * A modal dialogue box that, when its button is clicked, will parse
 * the input as XML, interpret it as an Alloy instance, and add it
 * to the current datum list.
 */
export function ManualXMLModal({isOpen, onClose}: ManualXMLModelProps) {  
  const initialRef: React.MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
  const toast = useToast()

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="70rem" >
          <ModalHeader>Input Alloy-style XML datum:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{TEXT_manual_entry_modal_textarea_label}</FormLabel>
              <Textarea minH="20rem" ref={initialRef} placeholder={placeholderXML} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => {
              const dataEntered: string | undefined = initialRef.current?.value
              if(dataEntered === undefined) {onClose(); return}
              
              // New ID should default to the next highest positive integer ID used
              //   (IDs that are non-numeric will be ignored for this purpose)
              const currentIDs: string[] = store.getState().data.datumIds
              console.log(currentIDs)
              const nextIDInt: number = currentIDs.reduce( 
                (prev: number, curr: string) => {
                    return !isNaN(parseInt(curr)) 
                      ? (Math.max(prev, parseInt(curr) + 1))
                      : prev
                }, 
                0)
              console.log(nextIDInt)
              
              try {
                store.dispatch(dataReceived(
                  {enter: 
                    [parseAlloyDatum({
                      id: nextIDInt.toString(), 
                      format: "alloy", 
                      data: dataEntered,
                      buttons: [],
                      evaluator: false})], 
                   update: [], 
                   exit: []}))
                } catch(e) {
                    // error parsing Alloy XML
                    toast({
                        variant: 'top-accent',
                        position: 'bottom-right',
                        title: e instanceof Error ? e.name : 'Error adding instance',
                        description: e instanceof Error ? e.message : 'No further information is available.',
                        status: 'error',
                        duration: 10000,
                        isClosable: true
                      })
                }

                // Finally, close the modal dialog
                onClose()
            }}
            >{TEXT_manual_entry_modal_add_button}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
