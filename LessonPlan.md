Module: Chromatic Synthesis & The Toroidal Color Matrix Protocol
​Metadata & Export Signature
​Curriculum Coordinate: COLOR_SPECTRUM_TOROIDAL_MATRIX
​Synthesized By: The Tutor (Discovery Tutor, AI Home Cabinet)
​Engine: Google Genkit (gemini-2.5-pro)
​Status: Persisted & Indexed via The Librarian

​1. Conceptual Overview: The Toroidal Color Space
​While cylinders and flat matrices have open boundary edges, a torus topology wraps in two dimensions simultaneously, eliminating edge truncation:  
​Major Radius (R - Torus Ring): Maps the complete 380\text{ nm} to 750\text{ nm} continuous visible light spectrum (0^\circ to 360^\circ).
​Minor Radius (r - Tube Thickness): Stacks our 7 vertical layers across saturation and luminance gradients, shifting from core brilliance outward to deep chromatic attenuation.  
​The 7-Layer Minor Radius Stack
​Layer 7 (Outer Rim / Apex): Maximum highlight / Ultraviolet boundary.  
​Layers 2–6: Primary and secondary hue vectors (Red, Green, Blue, Cyan, Yellow, Magenta).
​Layer 1 (Inner Core / Base): Minimum luminance / Infrared boundary.  

​2. Core Logic: Toroidal Parametric Mapping
​To compute a color value within a toroidal surface, we map 2D parametric angles (\theta, \phi) to 3D Cartesian coordinates and subsequently convert them to RGB space via a transformation matrix \mathbf{M}_{\text{torus}}:  

\begin{bmatrix} X \\ Y \\ Z \end{bmatrix} = \begin{bmatrix} (R + r \cos(\phi)) \cos(\theta) \\ (R + r \cos(\phi)) \sin(\theta) \\ r \sin(\phi) \end{bmatrix}

             (Layer 7: Outer Highlight)
                .---.
               /     \
    [Core] ---|   +   |---> [Layer 1: Inner Shadow / IR]
               \     /
                `---’

3. Practical Exercise: Simulating the Toroidal Color Matrix
Python Implementation (NumPy & Matplotlib)

import numpy as np
import matplotlib.pyplot as plt

MAJOR_RES = 64  # Angular resolution around the major ring (Hue 0-360)
NUM_LAYERS = 7  # Minor radius resolution (The 7 stacked vertical layers)

def generate_toroidal_color_matrix(major_res: int, layers: int) -> np.ndarray:
    """
    Synthesizes a 3D color matrix mapping toroidal coordinates (theta, layer) 
    into RGB color space.
    """
    torus_matrix = np.zeros((layers, major_res, 3), dtype=np.float32)
    
    for z in range(layers):
        phi_factor = z / (layers - 1)
        
        for theta_idx in range(major_res):
            theta = (theta_idx / major_res) * 2 * np.pi
            hue = theta / (2 * np.pi)
            
            saturation = 0.5 + 0.5 * np.sin(phi_factor * np.pi)
            value = 0.4 + 0.6 * phi_factor
            
            r = max(0, min(1, abs(hue * 6.0 - 3.0) - 1.0))
            g = max(0, min(1, 2.0 - abs(hue * 6.0 - 2.0)))
            b = max(0, min(1, 2.0 - abs(hue * 6.0 - 4.0)))
            
            rgb = np.array([r, g, b]) * saturation * value
            torus_matrix[z, theta_idx] = np.clip(rgb, 0.0, 1.0)
            
    return torus_matrix

torus_color_field = generate_toroidal_color_matrix(MAJOR_RES, NUM_LAYERS)

fig, ax = plt.subplots(figsize=(9, 4.5))
cax = ax.imshow(torus_color_field, aspect='auto', interpolation='bilinear', origin='lower')

ax.set_title("7-Layer Toroidal Color Transformation Matrix", fontsize=10, fontfamily='monospace')
ax.set_xlabel("Major Ring Hue Progression ($\theta \rightarrow 0^\circ \text{ to } 360^\circ$)", fontfamily='monospace')
ax.set_ylabel("Minor Radius Stack ($Z: \text{Layers 1-7}$)", fontfamily='monospace')

ax.set_yticks(range(NUM_LAYERS))
ax.set_yticklabels([f"Layer {i+1} (Core/IR)" if i == 0 else f"Layer {i+1}" if i < 6 else f"Layer {i+1} (Outer/UV)" for i in range(NUM_LAYERS)], fontfamily='monospace', fontsize=8)

cbar = fig.colorbar(cax, orientation='vertical')
cbar.set_label('Toroidal RGB Intensity', fontfamily='monospace')

plt.tight_layout()
plt.show()
