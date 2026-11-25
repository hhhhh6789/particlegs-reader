const glossary = {
  "ODE 积分器": "根据状态的变化规律，从起始状态算出指定时刻状态的工具。",
  "等距时间点": "相邻两个时间点之间的间隔相同。",
  "一维张量": "一串按顺序存放的数值。每个元素可以通过一个索引取出。",
  "球谐系数": "描述高斯颜色如何随观察方向变化的一组数值。",
  "球谐颜色系数": "描述高斯颜色如何随观察方向变化的一组数值。",
  "光栅化": "把场景投影到图像上，计算每个像素的值。",
};

const knownNames = {
  torch: "PyTorch 模块，提供张量和神经网络运算。",
  nn: "PyTorch 的神经网络模块，提供网络层和模型容器。",
  np: "NumPy 的常用别名，用于处理数组。",
  self: "当前对象。通过它访问这个对象的属性和方法。",
  __init__: "创建对象时，Python 自动调用的初始化方法。",
  "nn.Sequential": "按给定顺序串起网络层，前一层的输出交给后一层。",
  "nn.ModuleList": "保存并注册一组子模块，调用者决定怎样遍历和使用这些模块。",
  "nn.Linear": "用可学习的权重和偏置，把特征的最后一维映射到指定长度。",
  "nn.GELU": "对每个值做非线性变换，保留输入形状。",
  "nn.Module": "PyTorch 模型和网络层的基类，用来组织可训练参数和子模块。",
  "torch.autograd.Function": "PyTorch 自定义求导的基类，子类通过 forward 和 backward 指定前向和反向计算。",
  os: "Python 标准库模块，提供文件、目录和操作系统相关功能。",
  random: "Python 标准库模块，提供生成随机数、随机抽取元素和打乱顺序等功能。",
  "random.randint": "random 模块中的函数，从指定的下限到上限等概率抽取一个整数，包含两端。",
  "random.shuffle": "random 模块中的函数，直接打乱传入列表中各项的顺序。",
  "random.seed": "random 模块中的函数，设置随机数生成的起点。用同一个种子可以复现后续的抽样顺序。",
  "os.path": "Python 标准库中的路径处理模块。",
  "os.path.join": "把路径的各部分拼成一个路径。",
  object: "Python 对象的公共基类。类可以从它继承默认的对象行为。",
  property: "把类的方法声明为属性，访问属性时由这个方法计算并返回值。",
  staticmethod: "把方法声明为静态方法，调用时 Python 不会自动传入对象或类。",
  Exception: "常见 Python 异常的基类。捕获它可以处理大多数执行错误。",
  TypeError: "参数类型或调用方式不符合要求时发生的异常。",
  ValueError: "值的类型符合要求，但内容或取值不合法时发生的异常。",
  ImportError: "模块或模块中的成员无法导入时发生的异常。",
  RuntimeError: "运行过程中遇到无法继续的错误时抛出的异常。",
  OSError: "文件、目录等操作系统操作失败时抛出的异常。",
  "getattr": "按名字读取对象属性。传了默认值时，缺少这个属性就返回默认值。",
  "float32": "用 32 位存储的浮点数类型。",
  "self._features_rest": "每个高斯的其余球谐颜色系数，用于表示颜色随观察方向的变化。",
  "self._features_dc": "每个高斯的零阶球谐颜色系数，表示与观察方向无关的颜色分量。",
};

const moduleNames = {
  argparse: "Python 标准库模块，定义并读取命令行参数。",
  collections: "Python 标准库模块，提供字典、队列和具名元组等容器工具。",
  "concurrent.futures": "Python 标准库模块，提交并行任务并取得运行结果。",
  datetime: "Python 标准库模块，用来表示和处理日期及时间。",
  errno: "Python 标准库模块，提供文件已存在等系统错误的编号。",
  glob: "Python 标准库模块，按通配符查找符合模式的文件路径。",
  hashlib: "Python 标准库模块，为字节内容计算哈希值。",
  "importlib.util": "Python 标准库模块，提供查找、加载和初始化模块的工具。",
  json: "Python 标准库模块，在 Python 数据和 JSON 文本之间转换。",
  math: "Python 标准库模块，提供标量数学运算及常量。",
  pathlib: "Python 标准库模块，将文件路径表示为可拼接、可查询的对象。",
  re: "Python 标准库模块，用正则表达式匹配、提取或替换文本。",
  shutil: "Python 标准库模块，提供复制、移动文件和目录等操作。",
  struct: "Python 标准库模块，按指定字节顺序和类型读写二进制数据。",
  sys: "Python 标准库模块，访问解释器的参数、模块路径和标准输入输出。",
  tarfile: "Python 标准库模块，读取或写入 TAR 归档。",
  time: "Python 标准库模块，读取时间及测量运行耗时。",
  typing: "Python 标准库模块，为参数、返回值和变量声明类型。",
  uuid: "Python 标准库模块，用来生成通用唯一标识符。",
  cv2: "OpenCV 的 Python 模块，提供图像读取、缩放和颜色转换等工具。",
  imageio: "用于读写图像和视频的 Python 库。",
  lpips: "计算图像感知距离的库，这里用于比较渲染图与真实图。",
  numpy: "处理多维数组和数值计算的 Python 库。",
  PIL: "Pillow 的 Python 包，提供图像读取、转换和处理工具。",
  "PIL.Image": "Pillow 的图像模块，用来创建、读取和转换图片。",
  plyfile: "读写 PLY 格式点云及其属性的 Python 库。",
  "pytorch3d.ops": "PyTorch3D 的三维运算模块，项目用它做点云近邻查询和采样。",
  setuptools: "Python 打包工具，扩展模块的 setup.py 用它声明构建方式。",
  "torch.autograd": "PyTorch 的自动求导模块，用于记录运算和计算梯度。",
  "torch.nn": "PyTorch 的神经网络模块，提供网络层和模型容器。",
  "torch.nn.functional": "PyTorch 的函数式接口，提供卷积、激活和归一化等运算。",
  "torch.utils.cpp_extension": "PyTorch 的扩展构建模块，用来编译连接 C++ 或 CUDA 实现。",
  torchdiffeq: "用于在 PyTorch 中求解常微分方程的库。",
  torchvision: "PyTorch 的视觉工具库，提供图像转换、预训练模型和相关工具。",
  "torchvision.transforms.functional": "图像变换函数模块，用来缩放、转换及处理图像或张量。",
  tqdm: "在循环执行时显示进度条的 Python 库。",
};

const importedMembers = {
  "argparse.ArgumentParser": "命令行参数解析器。先登记可用选项，再从启动命令读取这些值。",
  "argparse.Namespace": "按属性名保存参数值的对象，例如用 args.model_path 读取模型路径。",
  "errno.EEXIST": "表示目标文件或目录已存在的系统错误编号。",
  "glob.glob": "按路径通配符查找匹配的文件，返回路径列表。",
  "math.exp": "计算自然指数 e 的指定次方。",
  "pathlib.Path": "Python 的路径类，用于拼接路径并访问文件和目录。",
  "plyfile.PlyData": "表示整个 PLY 文件的数据，能读取或写出点云数据。",
  "plyfile.PlyElement": "表示 PLY 文件的一组元素，例如带额外属性的顶点表。",
  "pytorch3d.ops.knn_points": "对每个查询点找到距离最近的 K 个点，用来建立局部邻域。",
  "pytorch3d.ops.knn_gather": "按近邻索引取出对应点的坐标或特征。",
  "pytorch3d.ops.sample_farthest_points": "逐次选离已选点最远的点，用来从点云选出分布较广的中心。",
  "setuptools.setup": "读取扩展的构建配置并登记为可安装的 Python 包。",
  "simple_knn._C.distCUDA2": "CUDA 扩展中的近邻距离函数，为每个点计算三个最近邻的平均平方距离。",
  "torch.nn.Module": "PyTorch 模型和网络层的基类，用来组织可训练参数和子模块。",
  "torch.utils.data.Dataset": "PyTorch 数据集基类。子类实现样本数量和按索引读取样本。",
  "torch.utils.tensorboard.SummaryWriter": "把训练指标和图像写成 TensorBoard 可以读取的日志。",
  "torchdiffeq.odeint": "ODE 积分函数，根据变化率和已知起始状态求指定时刻的状态。",
  "tqdm.tqdm": "把可迭代对象包装成带进度条的循环。",
  "typing.NamedTuple": "用有名字的字段定义一种元组，既能按字段名访问也能按位置读取。",
};

const nativeTypes = {
  bool: "布尔类型，保存真或假并用于条件判断。",
  int: "整数类型，用于保存编号、计数或索引。",
  float: "单精度浮点类型，用来保存坐标、颜色或权重等数值。",
  double: "双精度浮点类型，提供比 float 更多的有效数字。",
  uint32_t: "无符号的 32 位整数类型。",
  uint64_t: "无符号的 64 位整数类型。",
  size_t: "无符号大小类型，用于表示数组长度、元素数量或字节数。",
  void: "用于表示函数没有返回值，也可用于声明未指定元素类型的指针。",
  float2: "CUDA 的二分量浮点结构，分量通过 x 和 y 访问。",
  float3: "CUDA 的三分量浮点结构，分量通过 x、y、z 访问。",
  float4: "CUDA 的四分量浮点结构，分量通过 x、y、z、w 访问。",
  uint2: "CUDA 的二分量无符号整数结构。",
  dim3: "CUDA 的三维尺寸类型，可指定核函数的网格和线程块大小。",
  std: "C++ 标准库的命名空间，用来定位向量、元组等标准工具。",
  glm: "GLM 数学库的命名空间，提供向量、矩阵和几何变换。",
  "glm::vec3": "GLM 的三分量浮点向量。",
  "glm::vec4": "GLM 的四分量浮点向量。",
  "glm::mat3": "GLM 的 3×3 浮点矩阵。",
  "glm::mat4": "GLM 的 4×4 浮点矩阵。",
  "torch::Tensor": "PyTorch 的 C++ 张量类型，原生扩展通过它读取或返回张量。",
  __global__: "CUDA 核函数的声明标记，启动时由 GPU 上的一组线程执行。",
  __device__: "CUDA 设备声明标记，此函数或对象供 GPU 端代码使用。",
  __shared__: "CUDA 共享内存标记，同一个线程块中的线程能访问这段存储。",
};

const stylesheetNames = {
  color: "设置文字的前景颜色。",
  background: "设置背景颜色、图片及其显示方式。",
  "background-color": "设置元素的背景颜色。",
  "font-family": "按顺序列出可使用的字体。",
  "font-size": "设置文字大小。",
  "font-weight": "设置文字粗细。",
  "line-height": "设置每行文字占用的高度。",
  margin: "设置元素边框外侧的间距。",
  padding: "设置元素内容与边框之间的间距。",
  border: "设置边框的宽度、样式和颜色。",
  display: "指定元素的布局方式，例如按块、弹性布局或网格显示。",
  position: "指定用文档流、父容器或视口作为定位依据。",
  width: "设置元素的宽度。",
  height: "设置元素的高度。",
};

const environmentNames = {
  name: "创建后用于识别和激活这个 Conda 环境的名称。",
  channels: "Conda 查找可安装依赖时使用的软件包来源。",
  dependencies: "创建环境时要安装的包及其版本要求。",
  pip: "列出交由 pip 安装的 Python 包。",
};
const typeMeanings = {
  "arguments.ModelParams": "场景和模型的配置类，保存数据路径、模型路径和相机读取等设置。",
  "arguments.PipelineParams": "渲染流程的配置类，控制球谐颜色和协方差在哪里计算，以及是否开启调试。",
  "scene.gaussian_model.GaussianModel": "管理场景中的基础高斯，保存位置、颜色、尺度、旋转和不透明度等参数。",
  "scene.Scene": "组织一个场景的相机和高斯模型，负责从点云初始化或加载已保存的高斯。",
  "scene.cameras.Camera": "保存单个视角的图像、相机位姿、投影矩阵和对应时刻。",
  "utils.graphics_utils.BasicPointCloud": "存放点坐标、颜色和法线的点云记录，用于初始化高斯。",
  "scene.dataset_readers.SceneInfo": "读取场景后得到的记录，包含初始点云、各组相机列表和场景范围。",
  "scene.dataset_readers.CameraInfo": "读取数据时整理出的相机记录，包含图像、位姿、视场和帧时间。",
  "scene.network.ODEFunc": "接收当前时刻和共享状态，预测这个状态的瞬时变化率。",
  "argparse.ArgumentParser": "Python 的命令行参数解析器，用来注册并读取运行选项。",
  "torch.Tensor": "PyTorch 的张量类型，用来保存可进行批量运算的数值数据。",
  "numpy.array": "NumPy 创建数组的函数。这里的类型标注表示这个值按 NumPy 数组来处理。",
  "typing.Optional": "表示这个值可以是方括号里的类型，也可以是 None。",
  "typing.Tuple": "表示由多项值组成的元组，方括号中列出各项的类型。",
  bool: "布尔类型，取值为 True 或 False，常用作开关或判断结果。",
  int: "整数类型，常用于数量、编号或索引。",
  float: "浮点数类型，用来表示时间、尺度等可以带小数的值。",
  str: "字符串类型，用来保存路径、名称等文本。",
  dict: "字典类型，用键来存取对应的值。",
  list: "列表类型，按顺序保存多项内容。",
};

const timeGridNames = {
  ts: "存放生成的等距时间点。积分器按这些时间点给出对应的状态。",
  "torch.linspace": "生成等距点的函数。这里从起始时间到目标时间取点，包含两个端点。",
  start: "linspace 的形参，指定第一个时间点。这里传入 t_start。",
  end: "linspace 的形参，指定最后一个时间点。这里传入 t_end。",
  t_start: "起始时间。它是生成的第一个时间点，也是积分开始的时刻。",
  t_end: "目标时间。它是生成的最后一个时间点，也是要取出状态的时刻。",
  steps: "linspace 的形参，指定要生成的时间点总数。",
  num_steps: "这次要生成的时间点总数，传给 linspace 的 steps 参数。",
  device: "linspace 的形参，指定新建的时间点张量放在哪个设备上。",
  "g_start.device": "起始状态所在的设备。用它创建时间点，两个张量就会在同一个设备上。",
  dtype: "linspace 的形参，指定时间点用什么数值类型存储。",
  "g_start.dtype": "起始状态的数值类型，例如 float32。时间点沿用这个类型。",
  g_start: "ODE 积分从这个状态出发。这里读取它的设备和数值类型来创建时间点。",
};

const scopedNames = {
  "train.py": [
    [195, 195, {
      "viewpoint.fid": "每个候选相机的拍摄时刻，这里取最大的值作为数据中最晚的时刻。",
    }],
    [212, 212, {
      randint: "random 模块里的随机整数函数。这里从 0 到列表的最后一个索引等概率抽一个索引。",
      "self.viewpoint_stack": "本轮还没抽到的相机列表，取出一个视角后就从这个列表移除。",
      "self.viewpoint_stack.pop": "列表方法。按抽到的索引取出对应相机，同时从候选列表移除它。",
    }],
  ],
  "arguments/__init__.py": [
    [18, 134, {
      ParamGroup: "命令行配置的基类。把配置对象的属性登记为可从命令行传入的选项。",
    }],
  ],
  "metrics.py": [
    [92, 94, {
      psnrs: "各张图像的 PSNR 数值，这里将它们转换为线性误差，再计算汇总指标。",
    }],
  ],
  "scene/dataset_readers.py": [
    [208, 208, {
      "x.image_name": "候选相机记录的图像名，排序时用作比较键。",
    }],
  ],
  "utils/camera_utils.py": [
    [52, 57, {
      "args.data_device": "配置中的相机数据设备。未开启按需上传时，将该设备传给 Camera。",
    }],
  ],
  "utils/general_utils.py": [
    [195, 207, {
      F: "包装标准输出的类。它可以按配置抑制输出，也能在换行时附上时间。",
    }],
  ],
  "scene/network.py": [
    [533, 555, {
      input_dim: "共享状态向量的长度。网络最终输出也回到这个维数。",
      hidden_dim: "中间网络层的特征宽度。",
      time_input_ch: "表示时间所用的特征数，与状态向量拼接后形成网络输入。",
      "self.net1": "变化率网络的第一组串联层，产生供下一步使用的中间向量。",
      "self.net2": "变化率网络的第二组串联层，输出对中间向量的修正。",
    }],
    [633, 644, timeGridNames],
  ],
  "submodules/depth-diff-gaussian-rasterization/cuda_rasterizer/forward.cu": [
    [296, 380, {
      T: "当前像素的剩余透过率。每叠加一个高斯就乘上 1 − alpha，用它控制后面高斯还能贡献多少。",
      alpha: "当前高斯在这个像素处的不透明度，用来计算它贡献的颜色和深度。",
      test_T: "试着叠加这个高斯后的剩余透过率。过低时停止继续处理这个像素。",
      power: "高斯衰减的指数项。由像素和高斯中心的屏幕距离及椭圆形状计算。",
      con_o: "当前高斯在屏幕上的椭圆参数和基础不透明度，前三项描述形状，w 保存基础不透明度。",
      "con_o.w": "当前高斯的基础不透明度。乘上该像素位置的高斯衰减，得到这个像素的不透明度。",
      C: "这个像素各颜色通道的累加结果，逐个加入高斯的颜色贡献。",
      D: "这个像素的深度累加值，每个高斯的深度按 alpha 与剩余透过率 T 加权。",
      collected_id: "当前批加载到共享内存的高斯索引，用于找到每个高斯的颜色和深度。",
      last_contributor: "最后一个实际参与像素合成的高斯在遍历中的位置，写入输出供反向计算使用。",
    }],
  ],
  "scene/__init__.py": [
    [59, 89, {
      sceneLoadTypeCallbacks: "按数据集类型找到对应读取函数的字典。例如 Colmap 对应 COLMAP 场景读取器。",
      "args.source_path": "传给读取器的数据目录。",
      "args.images": "数据目录下存放 COLMAP 图像的子目录名，通常为 images。",
      "args.white_background": "控制透明区域与白底还是黑底合成。",
      "args.eval": "读取器接收的评估选项。",
      skip_train: "是否跳过训练和初始化视角。",
      skip_val: "是否跳过验证视角。",
      skip_test: "是否跳过测试视角。",
      max_train_cameras: "限制读取或保留的训练相机数量。",
      max_init_cameras: "限制保留的初始化相机数量。",
      max_val_cameras: "限制读取或保留的验证相机数量。",
      max_test_cameras: "限制读取或保留的测试相机数量。",
    }],
    [47, 52, {
      load_iteration: "指定加载哪个迭代。-1 表示选最大编号，None 表示跳过加载。",
      "self.loaded_iter": "记录最终选中的迭代编号，供后面的高斯模型加载使用。",
      "self.model_path": "存放模型、检查点和导出结果的目录。",
      searchForMaxIteration: "从保存目录读取已有的迭代编号，返回最大的一个。",
    }],
    [92, 93, {
      src_file: "用于读取原始 PLY 点云的文件对象。",
      dest_file: "用于写入模型目录下 input.ply 的文件对象。",
    }],
    [101, 106, {
      scene_info: "场景数据记录，包含初始点云和各组相机列表。",
      args: "当前场景配置，包含各组相机的数量上限。",
      "scene_info._replace": "返回一份替换了指定相机列表的新场景记录。",
      _replace: "返回一份替换了指定相机列表的新场景记录。",
      subsample_cam_infos: "在相机列表超过上限时，按列表位置选取其中的一部分。",
      train_cameras: "图像监督阶段使用的相机列表。",
      init_cameras: "初始化阶段使用的相机列表。",
      val_cameras: "验证阶段使用的相机列表。",
      test_cameras: "测试阶段使用的相机列表。",
      skip_train: "为真时跳过训练相机和初始化相机的采样。",
      skip_val: "为真时跳过验证相机的采样。",
      skip_test: "为真时跳过测试相机的采样。",
      max_train_cameras: "训练相机的保留上限。",
      max_init_cameras: "初始化相机的保留上限。",
      max_val_cameras: "验证相机的保留上限。",
      max_test_cameras: "测试相机的保留上限。",
    }],
  ],
};

const simpleName = /^[A-Za-z_$][\w$]*(?:(?:\.|::|->)[A-Za-z_$][\w$]*)*$/;
const codeNames = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\`(?:\\.|[^\`\\])*\`|\b(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?[fjLuU]?)\b|[A-Za-z_$][\w$]*(?:(?:\.|::|->)[A-Za-z_$][\w$]*)*/g;
const nativeCodeNames = new RegExp(String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/|${codeNames.source}`, "g");
const glossaryNames = new RegExp(Object.keys(glossary).sort((a, b) => b.length - a.length).join("|"), "g");
const sourceLinesForTerms = new WeakMap();
const nameContextIndex = window.PARTICLE_NAME_CONTEXTS || {files: {}, meanings: []};
const pythonKeywords = new Set(("False None True and as assert async await break class continue def del elif else except "
  + "finally for from global if import in is lambda nonlocal not or pass raise return try while with yield").split(" "));
const nativeKeywords = new Set(("if else for while do return break continue try catch finally throw class struct union enum "
  + "namespace import from as in switch case default template typename using new delete static inline const constexpr auto "
  + "public private protected virtual extern friend override final sizeof let var function extends export of then fi done "
  + "esac true false null nullptr NULL undefined").split(" "));
let proseTypes;

function vagueNameMeaning(value) {
  const text = typeof value === "string" ? value : value?.description || "";
  return /^(?:代码在这里引用|调用这里链接|从 .+ 导入的名称|导入的模块 .+，用来访问|这里调用 .+，将括号|这个函数接收的参数，由调用者|(?:对象的一个属性|本文件在这里定义的[函数类])|保存对应语句算出的值|指定同名选项|作为第.*实参传入|候选值|执行.*调用|结果由该函数)/.test(text);
}

function shortMeaning(value) {
  if (typeof value !== "string") return "";
  const text = value.replace(explanationMarkup, (_, code, bold) => code ?? bold.replaceAll(String.fromCharCode(96), ""))
    .replace(/\s+/g, " ").trim();
  if (vagueNameMeaning(text)) return "";
  const parts = text.match(/[^。！？；]+[。！？；]?/g) || [];
  if (!parts.length) return "";
  const first = parts[0].trim();
  const second = parts[1]?.trim() || "";
  const summary = second && first.length + second.length < 96 ? first + second : first;
  return summary.length <= 125 ? summary : "";
}

function collectNameMeanings(file, first, last) {
  const {path} = file;
  const names = new Map(path.endsWith(".py") ? [...Object.entries(moduleNames), ...Object.entries(knownNames)]
    : /\.(?:c|cc|cpp|cu|cuh|h|hpp|inl)$/.test(path) ? Object.entries(nativeTypes) : []);
  const local = new Map();
  const ambiguous = new Set();
  const entries = expressionIndex.files[path] || {};
  const scope = file.symbols?.findLast(([from, to, , kind]) => kind === "函数" && from <= first && first <= to);
  const put = (name, value) => {
    const meaning = shortMeaning(value);
    if (simpleName.test(name || "") && meaning) names.set(name, meaning);
  };
  const remember = (name, value) => {
    const meaning = shortMeaning(value);
    if (!meaning || !simpleName.test(name || "") || ambiguous.has(name)) return;
    if (local.has(name) && local.get(name) !== meaning) {
      local.delete(name);
      ambiguous.add(name);
    } else local.set(name, meaning);
  };
  const definitionAt = scope?.[0] ?? first;
  const definitionEnd = scope ? Math.min(scope[1], scope[0] + 7) : last;
  for (let line = definitionAt; line <= definitionEnd; line++) {
    for (const [label, detail, , metadata] of entries[line]?.definition?.rows || []) {
      put(metadata?.name || label, detail);
    }
    for (const [name, detail] of projectManual[path]?.[line]?.parameters || []) put(name, detail);
    if (entries[line]?.definition) break;
  }

  function readArguments(arguments_, written) {
    for (const [label, fallback, children, info] of arguments_) {
      const meaning = argumentMeaning(label, info, fallback, written);
      remember(info?.name, meaning);
      if (info?.value && info.value !== info.name && simpleName.test(info.value)) {
        const description = shortMeaning(meaning);
        if (description) {
          const bind = info.name ? "传给 " + info.name + "。" : "";
          remember(info.value, bind + description);
        }
      }
      children.forEach(child => readNode(child));
    }
  }

  function readNode(node, written) {
    if (node.kind === "call") {
      const name = shortCallName(node.name);
      remember(name, node.purpose || node.result);
      if (node.target && !names.has(name)) {
        const [origin, definitionLine] = node.target;
        const detail = shortMeaning(node.purpose || node.result);
        if (detail) names.set(name, {description: detail, source: origin + " · 第 " + definitionLine + " 行"});
      }
      const member = name.split(/\.|::|->/).at(-1);
      if (member !== name && node.receiver?.length) remember(member, node.purpose || node.result);
      readArguments(node.arguments, written);
    }
    node.receiver?.forEach(child => readNode(child));
    node.children?.forEach(child => readNode(child));
    node.parts?.forEach(([, , children]) => children.forEach(child => readNode(child)));
  }

  let lines = sourceLinesForTerms.get(file);
  if (!lines) {
    lines = file.text.split("\n");
    sourceLinesForTerms.set(file, lines);
  }
  for (let line = first; line <= last; line++) {
    const entry = entries[line];
    const written = projectManual[path]?.[line];
    const example = lineGroup(path, line)?.[3].find(([start]) => start === line)?.[4];
    const parameterGuidance = written?.parameters || example?.parameters;
    entry?.nodes.forEach((node, index) => readNode(node, index === 0 && entry.outer ? parameterGuidance : undefined));
    const assignment = lines[line - 1]?.match(/^\s*([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)\s*=(?!=)/);
    if (assignment) remember(assignment[1], written?.result || (entry?.outer && entry.nodes[0].result));
    for (const [name, detail] of written?.parameters || []) remember(name, detail);
  }
  if (!entries[first]?.nodes.some(node => node.kind === "call")) {
    for (const [, , kind, , rows] of visibleParameterRecords(path, first, first, last)) {
      if (kind === "call") readArguments(legacyCallArguments(rows), projectManual[path]?.[first]?.parameters);
      else if (kind === "definition") {
        for (const [label, detail, key] of rows) remember(key || parameterNames(label)[0], detail);
      }
    }
  }
  for (const [name, detail] of local) if (!names.has(name)) names.set(name, detail);
  if (path.endsWith(".py")) {
    for (const [type, meaning] of projectTypeNames()) if (!names.has(type)) names.set(type, meaning);
    addLocalBindings(file, lines, names, first, last);
  }
  for (let line = first; line <= last; line++) {
    for (const [name, id] of Object.entries(nameContextIndex.files[path]?.[line] || {})) {
      const detail = nameContextIndex.meanings[id];
      const current = names.get(name);
      if (!current || vagueNameMeaning(current)) {
        names.set(name, current?.source ? {description: detail, source: current.source} : detail);
      }
    }
  }
  const scoped = scopedNames[path]?.find(([start, end]) => start <= first && last <= end);
  for (const [name, meaning] of Object.entries(scoped?.[2] || {})) names.set(name, meaning);
  for (let line = first; line <= last; line++) {
    for (const [name, [canonical, path, definitionLine]] of Object.entries(file.types?.[line] || {})) {
      const description = Object.hasOwn(typeMeanings, canonical) ? typeMeanings[canonical] : "";
      if (path || description) {
        names.set(name, {
          description: description || "项目中的类。在这里用作类型标注。",
          source: path ? path + " · 第 " + definitionLine + " 行" : "",
        });
      }
    }
  }
  return names;
}

function projectTypeNames() {
  if (proseTypes) return proseTypes;
  proseTypes = new Map(Object.entries(typeMeanings).filter(([name]) => !name.includes(".")));
  for (const file of files) {
    for (const [start, , name, kind] of file.symbols || []) {
      const [canonical, origin, line] = file.types?.[start]?.[name] || [];
      if (kind !== "类" || !origin || !typeMeanings[canonical]) continue;
      proseTypes.set(name, {description: typeMeanings[canonical], source: origin + " · 第 " + line + " 行"});
    }
  }
  return proseTypes;
}

function importMeaning(origin, importingFile, seen = new Set()) {
  if (origin.startsWith(".")) {
    const lead = origin.match(/^\.+/)[0].length;
    const folders = importingFile.split("/").slice(0, -lead);
    origin = [...folders, origin.slice(lead)].filter(Boolean).join(".");
  }
  if (!origin || seen.has(origin)) return null;
  seen.add(origin);
  const known = knownNames[origin] || importedMembers[origin] || moduleNames[origin] || typeMeanings[origin];
  if (typeof known === "string") return known;

  const segments = origin.split(".");
  for (let end = segments.length; end > 0; end--) {
    const modulePath = segments.slice(0, end).join("/");
    const source = byPath.get(modulePath + ".py") || byPath.get(modulePath + "/__init__.py");
    if (!source) continue;
    const member = segments.slice(end).join(".");
    if (!member) {
      const purpose = projectGuide.files[source.path];
      return {description: purpose ? "项目模块。" + purpose : "从 " + source.path + " 加载的项目模块。", source: source.path};
    }
    const definition = source.symbols?.find(([, , name]) => name === member);
    if (definition) {
      const [line, , , kind] = definition;
      const note = expressionIndex.files[source.path]?.[line]?.definition?.purpose;
      const rawDoc = projectNotes[source.path]?.[line]?.[2];
      const detail = shortMeaning(note) || shortMeaning(rawDoc);
      if (detail) return {description: (kind === "类" ? "项目中的类。" : "项目中的函数。") + detail, source: source.path + " · 第 " + line + " 行"};
    }
    const reexport = source.bindings && Object.hasOwn(source.bindings, member) &&
      source.bindings[member].find(([, scope, , role]) => !scope && (role === "import" || role === "module"));
    if (reexport) return importMeaning(reexport[4], source.path, seen);
  }
  return null;
}

function addLocalBindings(file, lines, names, first, last) {
  const visible = lines.slice(first - 1, last).join(" ").matchAll(codeNames);
  const symbols = new Set();
  for (const [token] of visible) {
    if (!simpleName.test(token)) continue;
    symbols.add(token);
    symbols.add(token.split(".")[0]);
  }
  for (let line = first; line <= last; line++) {
    for (const [start, end] of file.interpolations?.[line] || []) {
      symbols.add(lines[line - 1].slice(start, end));
    }
  }
  for (const name of symbols) {
    if (!Object.hasOwn(file.bindings || {}, name)) continue;
    const bindings = file.bindings[name].filter(([at, from, to]) =>
      at >= first && at <= last || (!from || from <= first && first <= to) && at <= last
      || name.startsWith("self."));
    bindings.sort(([a, aFrom], [b, bFrom]) => (b <= last) - (a <= last) || bFrom - aFrom || b - a);
    if (!bindings.length) continue;
    const [at, from, , role, origin] = bindings[0];
    if (role === "module" || role === "import") {
      const detail = importMeaning(origin, file.path);
      if (detail) names.set(name, detail);
      else if (!names.has(name)) {
        const [kind, moduleName] = role === "module"
          ? ["模块", origin]
          : ["导入成员", origin.slice(0, origin.lastIndexOf("."))];
        names.set(name, {description: kind + "，来源是 " + moduleName + "。", source: file.path + " · 第 " + at + " 行"});
      }
      continue;
    }
    if (names.has(name)) continue;
    const records = expressionIndex.files[file.path] || {};
    const row = records[at];
    let description = "";
    if (role === "assignment" || role === "attribute") {
      description = shortMeaning(row?.outer && row.nodes[0].result)
        || shortMeaning(projectManual[file.path]?.[at]?.result)
        || shortMeaning(projectNotes[file.path]?.[at]?.[2]);
    } else if (role === "function" || role === "class") {
      description = shortMeaning(row?.definition?.purpose);
    }
    const roles = {
      parameter: "这个函数接收的参数，由调用者传入。",
      assignment: from ? "保存对应语句算出的值，供当前作用域使用。" : "文件级变量，保存对应语句算出的值。",
      attribute: "对象的一个属性，保存该对象后续操作会使用的值。",
      unpack: "接收右侧解包后对应位置的一个值。",
      iteration: "保存本轮循环取到的值或其中的一项。",
      exception: "保存这一分支捕获到的异常对象。",
      resource: "接收进入当前资源管理块时得到的对象。",
      function: "本文件在这里定义的函数。",
      class: "本文件在这里定义的类。",
      module: "导入的模块 " + origin + "，用来访问该模块提供的成员。",
      import: "从 " + origin + " 导入的名称，供当前文件使用。",
    };
    names.set(name, {
      description: description || roles[role],
      source: file.path + " · 第 " + at + " 行",
    });
  }
}

function insertTerm(parent, text, label, meaning, prose) {
  const token = add(parent, "button", text, prose ? "name-term text-term" : "name-term");
  token.type = "button";
  token.dataset.name = label;
  token.dataset.meaning = typeof meaning === "string" ? meaning : meaning.description;
  if (meaning.source) token.dataset.definition = meaning.source;
}

function sourceNameRole(token, qualified, index, count, before, rest, language) {
  const compact = value => value.replace(/\s+/g, " ").trim().slice(0, 72);
  const head = before.slice(-160);
  const tail = rest.slice(0, 160);
  const namespace = qualified.includes("::");
  const member = qualified.slice(0, -token.length).replace(/(?:\.|::|->)$/, "");
  if (index < count - 1) return "当前访问的限定名。后面的成员通过 " + qualified + " 查找。";
  if (language === "py" && /\bfrom\s+[^\s]*$/.test(head)) return "导入来源所在的模块，用来查找 import 后列出的成员。";
  const assignment = tail.match(/^\s*=(?!=)\s*([^;\n]+)/);
  if (assignment) return "写入值的" + (index ? "成员" : "变量") + "。这里保存 " + compact(assignment[1]) + " 的结果。";
  const indexing = tail.match(/^\s*\[([^\]]{1,65})\]/);
  if (indexing) return "被索引的对象，用 " + compact(indexing[1]) + " 选出其中一项或一段。";
  const call = tail.match(/^\s*\(([^()]{0,70})\)/);
  if (call) return "可调用对象。这里计算 " + qualified + "(" + compact(call[1]) + ")。";
  if (/^\s*\(/.test(tail)) return "这里调用的" + (member ? "成员函数" : "函数或可调用对象") + "，接收后面括号中的输入。";
  if (index > 0) return (namespace ? "限定名 " : "成员访问 ") + qualified + "，从 " + member + " 取得 " + token + "。";
  if (/\b(?:if|while|assert)\b/.test(head)) return "这个条件中的判断值，影响接下来是否执行对应代码。";
  if (/\breturn\b/.test(head)) return "函数返回表达式中的值，供调用方使用。";
  if (/\b(?:sizeof|decltype)\s*\([^)]*$/.test(head)) return "运算的输入，用来确定对象的大小或表达式的类型。";
  const macro = head.match(/^\s*#\s*(define|ifdef|ifndef|undef)\s*$/);
  if (macro) return "预处理宏。" + ({
    define: "后续代码可以引用这里定义的值或展开规则。",
    ifdef: "已经定义时编译下面的条件分支。",
    ifndef: "尚未定义时编译下面的条件分支。",
    undef: "清除这个宏的定义，后面的代码不再展开它。",
  })[macro[1]];
  const rhs = head.match(/\b([\w.:[\]>-]+)\s*(?:[+*\/%&|^:-])?=(?!=)[^;=]*$/);
  if (rhs) return "右侧表达式中的输入，参与计算写给 " + rhs[1] + " 的值。";
  const argument = head.match(/([\w.:-]+)\s*\(([^()]*)$/);
  if (argument) return "括号内的输入，用于 " + argument[1] + " 的调用或构造。";
  if (/^\s*:\s*\S/.test(tail) && /^(?:yml|yaml|css)$/.test(language)) {
    return "这里设置的" + (language === "css" ? "样式属性" : "配置键") + "，当前取值为 " + compact(tail.trimStart().slice(1)) + "。";
  }
  return "";
}

function splitCodeTerms(node, meanings, prose, source = false, language = "") {
  const text = node.nodeValue;
  const parts = document.createDocumentFragment();
  const native = Boolean(source && /^(?:c|cc|cpp|cu|cuh|h|hpp|inl|js|css)$/.test(language));
  const keywords = language === "py" ? pythonKeywords : nativeKeywords;
  const formatAsCode = prose && !node.parentElement.closest("code");
  const shell = language === "sh" || language === "bash";
  if (source && shell && text.trimStart().startsWith("#")) return;
  let offset = 0;
  for (const match of text.matchAll(native ? nativeCodeNames : codeNames)) {
    const token = match[0];
    if (source && ((shell && /^[\$"]/.test(token)) || (language === "js" && token.startsWith(String.fromCharCode(96))))) {
      const fields = shell ? /(?<!\\)\$(?:\{([A-Za-z_]\w*)(?=[}:])|([A-Za-z_]\w*))/g : /(?<!\\)\$\{([^{}]+)\}/g;
      const substitutions = [...token.matchAll(fields)];
      if (substitutions.length) {
        parts.append(text.slice(offset, match.index));
        let last = 0;
        for (const field of substitutions) {
          const value = field[1] || field[2];
          const start = field.index + (field[1] ? 2 : 1);
          parts.append(token.slice(last, start));
          const interpolation = add(parts, "span", value, "interpolation-name");
          splitCodeTerms(interpolation.firstChild, meanings, prose, true, language);
          last = start + value.length;
        }
        parts.append(token.slice(last));
        offset = match.index + token.length;
        continue;
      }
    }
    if (!simpleName.test(token) || keywords.has(token)) continue;
    const keys = [...token.matchAll(/[A-Za-z_$][\w$]*/g)];
    const candidate = meanings.get(token);
    const meaning = !vagueNameMeaning(candidate) && candidate;
    const rest = text.slice(match.index + token.length);
    if (!source && !keys.some(key => meanings.has(token.slice(0, key.index + key[0].length)))) continue;
    parts.append(text.slice(offset, match.index));
    const target = formatAsCode ? add(parts, "code") : parts;
    if (meaning && (keys.length === 1 || prose)) {
      insertTerm(target, token, token, meaning, prose);
    } else {
      let start = 0;
      for (const [index, {[0]: key, index: column}] of keys.entries()) {
        target.append(token.slice(start, column));
        const qualified = token.slice(0, column + key.length);
        const mapped = meanings.get(qualified);
        const detail = mapped && !vagueNameMeaning(mapped) ? mapped
          : source && sourceNameRole(key, qualified, index, keys.length, text.slice(0, match.index), rest, language);
        if (detail) insertTerm(target, key, qualified, detail, prose);
        else target.append(key);
        start = column + key.length;
      }
    }
    offset = match.index + token.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function splitGlossaryTerms(node) {
  const text = node.nodeValue;
  const matches = [...text.matchAll(glossaryNames)];
  if (!matches.length) return [node];
  const parts = document.createDocumentFragment();
  const remaining = [];
  function appendText(value) {
    if (value) {
      const part = document.createTextNode(value);
      parts.append(part);
      remaining.push(part);
    }
  }
  let offset = 0;
  for (const match of matches) {
    const term = match[0];
    appendText(text.slice(offset, match.index));
    insertTerm(parts, term, term, glossary[term], true);
    offset = match.index + term.length;
  }
  appendText(text.slice(offset));
  node.replaceWith(parts);
  return remaining;
}

function splitMarkupTerms(node) {
  const text = node.nodeValue;
  const parts = document.createDocumentFragment();
  const tags = /<!--[\s\S]*?(?:-->|$)|<(\/?)([A-Za-z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  const attributes = /([A-Za-z_:][\w.:-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g;
  const meanings = {
    id: "这个元素在页面中的标识，可供样式、脚本或页内链接定位。",
    class: "为元素指定样式类，CSS 和 JavaScript 也可以用它找到这类元素。",
    href: "链接指向的地址。",
    src: "图像、视频或脚本等资源的来源地址。",
    alt: "描述图片内容的替代文本。",
    rel: "描述当前页面与链接资源的关系。",
    type: "说明此控件或资源的类型。",
    name: "元素的名称，用于提交表单字段或标记元数据。",
    content: "和元数据名称对应的内容。",
    charset: "浏览器解码当前文档时使用的字符编码。",
    style: "直接写在这个元素上的 CSS 样式。",
    title: "为当前元素提供的补充标题或提示。",
  };
  const elements = {
    html: "整份 HTML 文档的根元素。",
    head: "放页面标题、资源链接和其他元数据的区域。",
    body: "承载页面正文和交互控件的区域。",
    div: "通用块容器，用来组织同一区域中的内容。",
    span: "行内容器，用来标记一小段文字或内容。",
    a: "链接元素。通过 href 指向另一个页面或位置。",
    img: "图片元素。通过 src 指定图片文件。",
    script: "脚本元素，用来声明或加载页面运行的脚本。",
    link: "关联外部资源的元素，例如给页面加载样式表。",
    meta: "保存文档元数据，供浏览器读取字符编码等设置。",
    table: "把数据排列成行和列的表格。",
    tr: "表格中的一行，包含一个或多个单元格。",
    td: "表格中的数据单元格。",
    th: "表格中的标题单元格，用于说明一列或一行的含义。",
    pre: "保留空格和换行，用于显示源码或预格式化文本。",
    code: "标记一段代码或标识符。",
    p: "表示一段正文。",
    br: "在同一段内容中插入一次换行。",
    li: "列表中的一项。",
    ul: "无序列表，用来列出并列项目。",
    ol: "有序列表，用编号表示项目顺序。",
  };
  let offset = 0;
  for (const match of text.matchAll(tags)) {
    const [whole, ending, name, body] = match;
    if (!name || (body && !/^[\s/]/.test(body))) continue;
    parts.append(text.slice(offset, match.index), "<" + ending);
    const tag = name.toLowerCase();
    const purpose = Object.hasOwn(elements, tag) ? elements[tag]
      : /^h[1-6]$/.test(tag) ? "页面标题元素，用数字表示标题层级。" : "";
    if (purpose) insertTerm(parts, name, name, purpose, false);
    else parts.append(name);
    let index = 0;
    for (const attribute of body.matchAll(attributes)) {
      const key = attribute[1];
      parts.append(body.slice(index, attribute.index));
      const detail = Object.hasOwn(meanings, key) ? meanings[key]
        : key.startsWith("data-") ? "给元素保存一项数据，脚本可以通过 dataset 读取。" : "";
      if (typeof detail === "string" && detail) insertTerm(parts, key, key, detail, false);
      else parts.append(key);
      index = attribute.index + key.length;
    }
    parts.append(body.slice(index), ">");
    offset = match.index + whole.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function splitConfigurationTerms(node, language, path) {
  const text = node.nodeValue;
  const css = language === "css";
  const keys = css ? /(?:^|[;{])\s*((?:--)?[a-z][\w-]*)\s*:\s*([^;{}]*)/gi
    : /^(?:\s*[- ]?\s*)([A-Za-z_][\w-]*)\s*:\s*(.*)$/gm;
  const parts = document.createDocumentFragment();
  let offset = 0;
  for (const match of text.matchAll(keys)) {
    const [value, name, assigned] = match;
    const start = match.index + value.indexOf(name);
    const known = css ? stylesheetNames : path === "environment.yml" ? environmentNames : {};
    const setting = Object.hasOwn(known, name) ? known[name] : css
      ? (name.startsWith("--") ? "CSS 自定义属性，供 var() 读取。" : "这一条样式声明所设置的属性。")
      : "这个配置块中的键，用来读取冒号后设置的值。";
    parts.append(text.slice(offset, start));
    const input = assigned.trim().slice(0, 60);
    insertTerm(parts, name, name, setting + (input ? "当前值为 " + input + "。" : ""), false);
    offset = start + name.length;
  }
  if (offset) {
    parts.append(text.slice(offset));
    node.replaceWith(parts);
  }
}

function addExplanationTerms(panel, file, line) {
  const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (/[\w\u3400-\u9fff]/.test(node.nodeValue)) nodes.push(node);
  }
  const scopeMeanings = new Map();
  const language = file.path.split(".").at(-1).toLowerCase();
  const sourceLanguage = /^(?:py|cu|cuh|c|cc|cpp|h|hpp|inl|js|sh|bash|css|yml|yaml|cmake|in)$/.test(language)
    || /(?:^|\/)CMakeLists\.txt$/.test(file.path);
  for (const node of nodes) {
    const text = node.parentElement;
    if (!text || text.closest("button, a, input, select, svg, .kw, .comment, .line-note-header, .file-flow-caption")) continue;
    const locator = text.closest("[data-source-first], .expression-node[data-line]");
    const snippet = text.closest(".line-excerpt");
    const code = text.closest("code");
    const paragraph = text.closest(".line-note p, .line-note dd, .definition-return-meaning");
    if (snippet && /^html?$/.test(language)) {
      splitMarkupTerms(node);
      continue;
    }
    if (snippet && /^(?:css|yml|yaml)$/.test(language)) {
      splitConfigurationTerms(node, language, file.path);
      continue;
    }
    if (snippet || code || paragraph) {
      const first = Number(locator?.dataset.sourceFirst || locator?.dataset.line || line);
      const last = Number(locator?.dataset.sourceLast || first);
      const key = first + ":" + last;
      if (!scopeMeanings.has(key)) scopeMeanings.set(key, collectNameMeanings(file, first, last));
      const meanings = scopeMeanings.get(key);
      if (text.closest(".lit")) {
        const literal = node.nodeValue.match(/^["']([A-Za-z_]\w*)["']$/);
        if (literal && meanings.has(literal[1])) {
          const parts = document.createDocumentFragment();
          parts.append(node.nodeValue.at(0));
          insertTerm(parts, literal[1], literal[1], meanings.get(literal[1]), !snippet);
          parts.append(node.nodeValue.at(-1));
          node.replaceWith(parts);
        }
      } else {
        const source = Boolean(sourceLanguage && (snippet || code?.closest(".block-outline, .definition-return-code")));
        const fragments = paragraph && !code ? splitGlossaryTerms(node) : [node];
        for (const fragment of fragments) splitCodeTerms(fragment, meanings, !snippet, source, language);
      }
    }
  }
}

let nameTip;
let activeNameTerm;

function hideNameTip() {
  activeNameTerm?.removeAttribute("aria-describedby");
  activeNameTerm = null;
  if (nameTip) nameTip.hidden = true;
}

function showNameTip(term) {
  if (activeNameTerm === term) return;
  hideNameTip();
  if (!nameTip) {
    nameTip = add(document.body, "div", null, "name-tip");
    nameTip.id = "name-tip";
    nameTip.setAttribute("role", "tooltip");
    add(nameTip, "code");
    add(nameTip, "p");
    const origin = add(nameTip, "div", null, "name-tip-definition");
    add(origin, "span", "定义于");
    add(origin, "code");
  }
  activeNameTerm = term;
  nameTip.querySelector("code").textContent = term.dataset.name;
  nameTip.querySelector("p").textContent = term.dataset.meaning;
  const origin = nameTip.querySelector(".name-tip-definition");
  origin.hidden = !term.dataset.definition;
  origin.querySelector("code").textContent = term.dataset.definition || "";
  term.setAttribute("aria-describedby", nameTip.id);
  nameTip.hidden = false;
  const anchor = term.getBoundingClientRect();
  const excerpt = term.closest(".line-excerpt")?.getBoundingClientRect();
  const room = document.documentElement.clientWidth - nameTip.offsetWidth - 12;
  const x = Math.max(12, Math.min(room, anchor.left + (anchor.width - nameTip.offsetWidth) / 2));
  const below = (excerpt?.bottom ?? anchor.bottom) + 8;
  const above = (excerpt?.top ?? anchor.top) - nameTip.offsetHeight - 8;
  const y = below + nameTip.offsetHeight < innerHeight ? below : Math.max(8, above);
  nameTip.style.left = x + "px";
  nameTip.style.top = y + "px";
}

for (const event of ["pointerover", "focusin", "click"]) {
  document.addEventListener(event, action => {
    const term = action.target.closest?.(".name-term");
    if (term) showNameTip(term);
    else if (event === "click") hideNameTip();
  });
}
document.addEventListener("pointerout", event => {
  if (event.target === activeNameTerm && !activeNameTerm.matches(":focus-visible")) hideNameTip();
});
document.addEventListener("focusout", event => {
  if (event.target === activeNameTerm) hideNameTip();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideNameTip();
});
window.addEventListener("scroll", hideNameTip, {capture: true, passive: true});
window.addEventListener("resize", hideNameTip);
